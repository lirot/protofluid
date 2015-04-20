jwt.jwtComponent = (function() {

  var Configs  = {};
  var url_xx   = document.URL.replace(/\/\s*$/, '').split('/');

//  !url_xx[4] ? url_xx[4] = 'fsdev' : '';

  var stopRKey = function(evt) {
    var evt = (evt) ? evt : ((event) ? event : null);
      var node = (evt.target) ? evt.target :
	  ((evt.srcElement) ? evt.srcElement : null);
    if ((evt.keyCode == 13)) {
      return false;
    }
  };

    // parse runs through the http post respones and builds a javascript object
    // the object is the invoice transaction document. the object is mostly
    // organized
    // in a heaer line format, but does have a group section that aggreages
    // lines with
    // similar project and purchase orders looking at the page on line shows the
    // organization most clearly.  Besides the transaction data this
    // oject stores
    // error data related to the trasaction used later for display and edit
    // logic
    // the object also stores user related data for siilar purpose.
    // The script that
    // follows doesn't sue any rules or conigration it is main intent is to
    // transform the particalur response in an efficeint manner.  the parsing is
    // heavily dependent on the input element naming convention established
    // in the
    // peopletools page desinger.  There each input element is
    // named in a fashion
    // to allow for easier parsing.  For example, page elements are
    // given element
    // id starting with XX.  Header and line elements are XX_HSDR and XX_LIN
    // respectively.  This aides greatly in crating the
    // resulting javascript object
    // finally.  The javascript element is passsed to
    // downstrad to a html templating
    // processor and vinally to a callback script
    // allowing for more general purpose
    // logic based dom maniputation.

  var _parse = function(config, response, InstanceID) {

      var isHdr, isLine,  doc, jQInvComp, inputs, formName;

    doc        = document.implementation.createHTMLDocument("xxx");
    jQInvComp  = jQuery(doc.documentElement.innerHTML).html(response);
    totalLines = jQInvComp.find(config.lineString).length;
    inputs     = jQInvComp.find(config.filterString);
    formName   = jQuery(response).filter("form").attr('name');

    config.formName   = formName;
    config.instanceID = jQInvComp.find('#XX_HDR_SS').val();

    config.f_return = true;

//++++++++++  START  CATCH SERVER ERROS++++++++++++++++++++++++++++++++++++++
      
    if (jQInvComp.find('#XX_HDR_SA').val() == 'F') {
        //server sends instructios to blank page
        config.f_return = false;
        jQuery('#component-data .component').remove();
        return false;
    }

    document.onkeypress = stopRKey;
    var wLogin = response.indexOf(
	  "<title>Oracle | PeopleSoft Enterprise 8 Sign-in</TITLE>");

     if (wLogin > 0) { window.location.href =
	   "http://" + location.host + "/psp/" +
	               url_xx[4] + "/EMPLOYEE/ERP/?cmd=login" ;}
      

    var wOpen = response.indexOf("window.open(");

    if (wOpen < response.indexOf("<form") && wOpen > 0) {
	var nWindow = response.substring(wOpen,
					 response.indexOf(");", wOpen) + 2);
      eval(nWindow);
    }

    var wAlert = response.indexOf("alert(");

    if (wAlert < response.indexOf("<form") && wAlert > 0) {
	var nAlert = response.substring(wAlert,
					response.indexOf(");", wAlert) + 2);
      eval(nAlert);
      jQuery("#component-data").html("");
      return false;
    }

//++++++++++++++++ END  CATCH SERVER ERROS++++++++++++++++++++++++++++++++++++++
    jQuery('section form').remove();
    jQuery('#component-data input').remove();

    var jqForm = jQuery("<form class='xxForm' ></form>")
	  .attr('action', config.formAction).attr('name', formName);

    jQInvComp.find("input[type='hidden']")
	       .filter( function() {
                   if (jQuery(this).attr('name').indexOf('XX')) {
		       return true;
		   }
    }).appendTo(jqForm);

    jwt.form = jqForm;
    
    
    //return to the server to unlock document
    if (jQInvComp.find('#XX_HDR_SS').val() == 'IMG' || window.unlock) {
	if (jQInvComp.find('#XX_HDR_SS').val() == 'IMG' ||
	    jQInvComp.find('#XX_HDR_SS').val() == 'NEW') {
          jwt.routes.XX_HPB_200.serverFunction( );
      } else {
          jwt.routes.XX_HPB_201.serverFunction( );
      }

      window.unlock = false;
      jQuery(".focusedInput").focus();
      return false;

    }
      
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Below handles creating the invoice object
     
     var  isPrompt,
      isNew,  isDelete, lastKey;

      jwt.header = {},
      jwt.lines = [];
      jwt.ServerErrors = [];
      jwt.editArray = [];
      jwt.workflow  = {};

    for (var i = 0; i < totalLines; i++) {
      jwt.lines[i] = {};
        jwt.lines[i].ROW = "$" + i;
    }

    inputs.each(function(index) {
        elem = jQuery(this);
        var promptElem, attributes, focus, change, classTo, idprefix, re;
        isHdr = "";
        elem.isLine = ""; tempHeader = {}; tempLine = {};

        idprefix    = elem.attr('name').substring(0, 9);
        re          = new RegExp(config.headerMatch, 'g');
        isHdr       = elem.attr('name').match(re);
        re          = new RegExp(config.lineMatch);
        elem.isLine = elem.attr('name').match(re);

      if (  elem.attr('name') == "XX_HDR_AWE" ) {
            // workflow comes down from the response as xml in the body tag
             var parser  =new DOMParser();
             var xmlDoc  =parser.parseFromString(elem.html() ,"text/xml");
             jwt.workflow = jwt.functions.xmlToJson(  xmlDoc ) ;
             return true;
      }
      else if (elem.hasClass('to-user')) {
          // =========  JAVASCRIPT OBJECTS FROM SERVER COLLECTED HERE
          // =========  SERVER SENDS FROM WORKLOW POST VALIDATE
          jQuery.extend(jwt.user, elem.data('bs'));
      }
      else if (isHdr) {
        tempHeader[elem.attr('name')] = elem.val();
        if ( elem.attr('name') == "XX_HDR_VT" ){
            //unpack the ERROR DIV TAG AND LOAD THE ERRORS
            _.each( elem.find("li") , function(obj){
                //+++++++++++++ERRORS ++++++FROM SERVER VALIDATE FUNCTION
                //grab the error id and merge it with the client side meta data
                var retObj = jwt.functions.getError( jQuery(obj).attr('id') );
                if (  retObj ) {
                    console.log( jQuery(obj).attr('id') +
				 " : " +  jQuery(obj).html() );
                   //more dynamic add whatever properties are defined
                   var obj = {};
                   for (p in retObj) {
                       obj[p ] = retObj[p];
                   }
                   jwt.ServerErrors.push( obj );
                   jwt.editArray.push( obj.id );
               }else{
                   console.log("server error message not mapped!" +
			        jQuery(obj).attr('id') + jQuery(obj).html());
               }
            });
        }
          jQuery.extend(jwt.header, tempHeader);
      }
      else if (elem.isLine) {
          tempLine[idprefix = elem.attr('name').substring(0, 9)] = elem.val();
          jQuery.extend(jwt.lines[elem.isLine[0]], tempLine);
        }
      } //ends the each loop for inputs
    );

    var keys = [],
      lastkey = "";
    // loop build the section line structure grouping seen on the page
    _.each(jwt.lines, function(obj) {
      obj.key = obj.XX_LIN_PI + obj.XX_LIN_PO;
        var sec_disabled = ( obj.XX_LIN_CE  == "Y" ) ? "" : "disabled"; 
          obj.XX_LIN_CE = ( obj.XX_LIN_CE  == "Y" ) ? true : false;
      var sectionHeader = {};
      var temp =  { key : obj.key ,
		      pi : obj.XX_LIN_PI ,
		      po : obj.XX_LIN_PO ,
		    section_ce : obj.XX_LIN_CE, 
                    section_disabled :  sec_disabled  }
      jQuery.extend( sectionHeader, temp );
      ((lastkey !== obj.key) && obj.key !== "") ? keys.push(sectionHeader): "";
      lastkey = obj.key;
    });

    //the object used in the templates and callbacks
    jwt.invoice = {};
    jwt.invoice.ServerErrors = jwt.ServerErrors;
    jwt.invoice.editArray = jwt.editArray;
    jwt.invoice.totalLines = totalLines;
    jwt.invoice.lineNumberAdd = totalLines - 1;
    jwt.invoice.user = jwt.user;
      jwt.invoice.isNoLines = true;
      jwt.invoice.routeError = false;
    jwt.invoice.workflowLines = ( jwt.workflow.hasOwnProperty(
	  'rs_xx_289_awe_m_vw' ) ) ? jwt.workflow.rs_xx_289_awe_m_vw
	  .row_xx_289_awe_m_vw : "";

    jwt.invoice.header = jwt.header;

      jwt.invoice.header.Approverdisabled = jwt.user.isApprover ?
	    "disabled" : "";

      if (  window.view ){
          window.view = false;
          jwt.invoice.user.isLocked = true;
      }
      
    jwt.invoice.Locked = jwt.invoice.user.isLocked ?  "disabled" : "";
    jwt.invoice.sections = [];

    //add the secitons and the lines
    _.each(keys, function(keyObj, index) {
        jwt.invoice.sections[index] = {};
        jwt.invoice.sections[index].key = keyObj.key;
        jwt.invoice.sections[index].SectionHeader = keyObj;
        jwt.invoice.sections[index].lines = [];
        _.each(jwt.lines, function(obj2, index2) {
                  jwt.invoice.isNoLines = false;
           if (obj2.key == keyObj.key) {
	       jwt.invoice.sections[index].lines.push(obj2);}
        });
    });

	// run the can view and can edit function to determine
	// display settings for the route buttons
        // and fields

    var canView;
    var canEdit;
    jwt.invoice.user.canView = {};
    jwt.invoice.user.canEdit = {};

    var buttonList = _.filter( jwt.routes , function(obj){
        return obj.hasOwnProperty('canViewFunc' );
    });

    _.each( buttonList ,  function(obj){
        canView = obj.canViewFunc();
        jwt.invoice.user.canView[obj.Definition] = canView;  });

      //the facilities for edit and view like buttons exist
      // but are not widely implemented as further processing
      // after the templates are loaded and created has an impact
      // on edit and display properties for fields
      
    var fieldList = _.filter( jwt.fields , function(obj){
        return obj.hasOwnProperty('canViewFunc' );
    });

    _.each( fieldList ,  function(obj){
            canView = obj.canViewFunc();
            jwt.invoice.user.canView[obj.Definition] = canView;  });

    fieldList = _.filter( jwt.fields , function(obj){
        return obj.hasOwnProperty('canEditFunc' );
    });

    _.each( fieldList ,  function(obj){
            canEdit = obj.canEditFunc();
        (canEdit)? jwt.invoice.user.canEdit[obj.Definition] =
	    "disabled" : "" ;  });

    return true;

  };

  //convenience for addressing object members
  var init = function(name, obj) {
    this.Configs[name] = obj;
  };

  var xxAjax = function(config, instanceid, theform, name) {

    config = jwt.jwtComponent.Configs[config];
    jwt.activePageConfig = config.Definition;
    jwt.jwtWorkList.isFullPage =  config.Definition == 'jwtComponentConfigFull';
    jwt.jwtWorkList.reset_Tabs();

    //all form posts here an instance id is only populated off the worklists
    if (!instanceid) {
        if (typeof config.beforeCallback === 'function') {
            'jwt.' + config.beforeCallback(config);
        }

      jwt.form.find('input[name=ICAction]').val(name);
      jwt.form.find('input[name=ICFocus]').val(name);

      var jqXHRoptions = {
        type: "POST",
        url: "http://" + location.host + "/psc/" + url_xx[4] +
	      config.formAction,
        contentType: "application/x-www-form-urlencoded"
      };
	
      var input ;
	// grab all inputs in memory and push them on the form being
	// sent over the AJAX call

	jQuery(" *[ name^='XX']" ).each( function( index){
          input = jQuery(this).val() ? jQuery(this).val()  : " ";
            jQuery("<input name='" + jQuery(this).attr('name') + "'  value='" +
		    input + "' >").appendTo( jwt.form);
        });

      jqXHRoptions.data = jwt.form.serialize();

     if (config.saveMethods.indexOf( name ) )
         jwt.isDirty = false;
    } else {
      //clicks off the worklists
    	
      jwt.isDirty = false;
      jqXHRoptions = {
        async: true,
        type: "POST",
        url: "http://" + location.host + "/psc/" + url_xx[4] +
	      config.url + instanceid,
        contentType: "application/x-www-form-urlencoded"
      };
    }
    //now make the request
    var ret;
    jQuery.ajax(jqXHRoptions).done(
      function(data, textStatus, jqXHR) {
        //first callback call parse
          ret =     _parse(config, data, instanceid);
      },
      //second call back
      function(data, textStatus, jqXHR) {
          //blank pages and false returns from parse stop here
          if ( config.f_return && ret ){
             jQuery("#processing").trigger('hide.processing');
             jwt.templates.loadTemplate(config );
             if ( jwt.user.imageNowDocID != jwt.user.oldimageNowDocID ){
                jwt.user.oldimageNowDocID = jwt.user.imageNowDocID;
                 jQuery("#image-now").html(
		     "<iframe id='INiframe' class='imageNowIframe' src='" +
			 jwt.constants.imgNowURL + jwt.user.imageNowDocID +
			 "' ></iframe>");
            }
        }else{
          jQuery('#processing').trigger('hide.processing');


            if ( jwt.user.imageNowDocID != jwt.user.oldimageNowDocID ){
            jQuery('#image-now').html('');
            }

        }
      });
  };
  return {
    init: init,
    getData: xxAjax,
    Configs: Configs
  };
})();
