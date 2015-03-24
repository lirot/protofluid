jwt.jwtComponentConfigFull = (function() {
  return {

    Definition : 'jwtComponentConfigFull',
    //loader jquery find using filter string
    filterString: "input[id],  div [id^='XX'] ",
    //loader uses to find the number of lines in the form
    lineString: "input[id^='XX_LIN_LN']",
    //used by the template loader factory creates the page
    loadTemplate: jwt.templates.loadFullTemplate ,
    //name of tamplate object mapped to template file in template_hash
    templateName: 'FullTemplate',
    //used by page loader to find header inputs and divs
    headerMatch: "XX_HDR",
    //used by the loader to find lines
    lineMatch: /\d+/g,
    //used to store javascript object
    //bsUserObject: {},
    //save warning will reset dirty to false on these routes
    saveMethods : "XX_HPB_350,XX_HPB_001",
    //page loader will check this value on the callback
    //if its set will runt he approver route
    //value is set on certain routes
    useAlternateCallback: false,
    //url string for the server component controller
    formAction: '/EMPLOYEE/ERP/c/XX_AP_CUSTOM_MENU.XX_FCM289_APPR.GBL',
    //url for direct links
    url: ['/EMPLOYEE/ERP/s/WEBLIB_XX_NAV.WEBLIB_FUNCTION.FieldFormula.iScript_xxViewRPayInvoice?INSTANCEID='],
    //page level edits
    editArray : [ "msg-req-001" , "msg-val-in-001" ,"msg-val-id-001" , "msg-val-numbers" ,"msg-isFDApprove"],

    // errorArrayLength : 4,
    //could be used to do some initalization
    init: function() {},


    getPO_SubCat_Data_Add_Links: function(config) {

        var promises = [];
        var that = this;
        jwt.user.hasPO = false;
        _.each( jwt.invoice.sections , function(obj) {
           var def = new jQuery.Deferred();

           if (      obj.SectionHeader.po ){
               jwt.user.hasPO = true
               jQuery("#s2id_loc_S2_XX_HDR_VI .select2-search-choice-close").css("right","0px");
           }

           jwt.jwtData.init('xx_proj_attrtbl', jwt.jwtData.Configs['xx_proj_attrtbl']  , [ obj.SectionHeader.pi ], def);
           promises.push(def);
       });

        //jQuery('.xx-pop-po , .xx-pop-pi').hover(function() {
        //jwt.jwtData.Configs.xx_po_rpt.viewPopUP.call(this, jQuery(this).attr('data-link-id'));
        //});

      var url_jwt = document.URL.replace(/\/\s*$/,'').split('/');

      jQuery.when.apply(undefined, promises).promise().done(
        function() {
            _.each( jwt.invoice.sections , function(obj) {

                //at the section level...ie above the lines for project id and po combinations
                //reference and link urls needed to be coded.

                //get the porject id and project level data
                var piData =  jwt.jwtData.xx_proj_attrtbl["_" + obj.SectionHeader.pi.hashCode()];

                obj.SectionHeader.bu   =   piData.BUSINESS_UNIT ;
                obj.SectionHeader.ou   =   piData.OPERATING_UNIT;
                obj.SectionHeader.pt   =   piData.PROJECT_TYPE;

                //decode the data before sending to the tooltip
                jwt.jwtData.decode(piData);
                var outHTML = jwt.Mustache.to_html(jwt.templates['TOOLTIP_PROJECT_INFO'], piData);
                jQuery('[data-link-id="'  +  obj.SectionHeader.pi + '"]').html(outHTML);

                //make an ajax call to get the po data
                //the system will make a call back to a method on the data object xx_po_rpt to format and display the
                //the tooltip information
                jwt.jwtData.init('xx_po_rpt', jwt.jwtData.Configs['xx_po_rpt']  , [ obj.SectionHeader.po ]);

                //the project type and business unit will be needed when the drop down is clicked by the user
                //put it here so we can have it later
                var key = obj.SectionHeader.bu + obj.SectionHeader.pt ;
                jQuery(".loc_XX_LIN_SC[data-pi='" + obj.SectionHeader.pi +"']").attr('data-pt-bu' , key );

                 //the remaining code in the function is to direct the clicks on the links
                var urlqryString =   "?BUSINESS_UNIT=" +  obj.SectionHeader.bu + "&OPERATING_UNIT=" + obj.SectionHeader.ou + "&PROJECT_ID="     + obj.SectionHeader.pi + "&PO_ID=" + obj.SectionHeader.po;

                jQuery(".group[data-key='" + obj.SectionHeader.key +"']").find(".xx-link-pi-setup , .xx-link-po-modify, .xx-link-pj , .xx-link-estimate")
                .click(
                    function(event) {
                        event.preventDefault();
                    window.open("http://" + location.host + "/psc/" + url_jwt[4] + "_newwin/EMPLOYEE/ERP/s/WEBLIB_XX_NAV.WEBLIB_FUNCTION.FieldFormula.iScript_"  + jQuery(this).attr("data-script-id")
                    + urlqryString     ,'','');
                });

                jQuery(".group[data-key='" + obj.SectionHeader.key +"']").find(".xx-link-po-view").click( function(event) {
                    jwt.jwtComponent.getData( 'jwt.jwtComponentConfigFull' , null ,this.form ,  jQuery(this).attr("data-script-id") );
                });

            });
        });
    },

    controller: function(  elem ) {
        //function called by page loader before post.  handles updateing form elements
        // with values before trip to server.
        jQuery('#XX_HDR_HC').val(jQuery('#loc_XX_HDR_HC').val());
        jQuery('#XX_HDR_PY').val(jQuery('#loc_XX_HDR_PY').val());
        (jQuery('.NL-check').val()) ? jQuery('#XX_HDR_VL').val(""): null;
        jQuery(".ps-check").each(
            function(index) {
                var valcheck = (( jQuery(this).next().hasClass("checked")   ) ? "Y" : "N" )
            jQuery(this).val( valcheck  );
            }
        )
    },

    callbackAlternate: function(config) {
        //alternate call back is used to pop up the approval model
        //the page build will happen exactly the same as the user may decide to cancel out of the modal
        //that would unhide the page
        jwt.invoice.keepHidden = true;
        //load the template for this page but hide the page
        // now run the pop template
        jwt.templates.loadTemplate(jwt.jwtComponentConfigApprove);

    },

    callback: function(config) {

      //main callback for final display related activities
      //the template has rendered the page its now time for a final logic for display
      jwt.functions.addlines();

      jQuery("[id^='XX_LIN_MA'] , #XX_HDR_GA , #XX_HDR_RA, #XX_HDR_UT, #XX_HDR_ST").change(function() {
          jwt.functions.addlines();
      });

      //funciton will build all the select2 drop downs
      jwt.functions.createS2_header();

      config.getPO_SubCat_Data_Add_Links(config);

      var splitBtn = jQuery('.x-split-button');

      jQuery('.x-button-drop').on('click', function() {
          event.preventDefault();
          if (!splitBtn.hasClass('open'))
          splitBtn.addClass('open');
      });

      jQuery('.x-split-button').click(function(event){
          event.stopPropagation();
      });

      jQuery('html').on('click',function() {
          if (splitBtn.hasClass('open'))
          splitBtn.removeClass('open');
      });

     // the wire flag drive the display of the hold flag
      (jQuery('#loc_XX_HDR_WI').val() == "on" ) ? jQuery('#loc_XX_HDR_HF').attr( "disabled",  true ) : false ;

     //all the check boxes need to be rendered as pretty checkable controls and there values set
      jQuery(".ps-check").each(
          function(index) {
               jQuery(this).prettyCheckable();
              ( jwt.invoice.header[ jQuery( this).data('ps-id') ] == "Y" ) ? jQuery( this ).prettyCheckable('check') : jQuery( this ).prettyCheckable('uncheck') ;
      });

      //changing the wire flag has impacts on other controls
      jQuery('#loc_XX_HDR_WI' ).on('change' , function(event){
               ( jQuery('#loc_XX_HDR_WI').prop( "checked" ) == true ) ? jQuery('#loc_XX_HDR_HF').prettyCheckable('check') : jQuery('#loc_XX_HDR_HF').prettyCheckable('uncheck');
               ( jQuery('#loc_XX_HDR_WI').prop( "checked" ) == true ) ? jQuery('#loc_XX_HDR_HF').prettyCheckable('disable') : jQuery('#loc_XX_HDR_HF').prettyCheckable('enable');
               ( jQuery('#loc_XX_HDR_WI').prop( "checked" ) == true ) ? jQuery('#loc_XX_HDR_HF').val( "Y" ) : jQuery('#loc_XX_HDR_HF').val( "N" );
                  });

      //render the date pickder...this is the only jquery ui control being used
      jQuery("#XX_HDR_ID").datepicker();

      //try to make sense out of the back end table delivered as xml and rendered as a googl visualization table
      jwt.functions.cleanWorkFlowData();

      if (jwt.user.isApprover){
           jwt.jwtData.init('XX_289_D_VND_LC_SINGLE', jwt.jwtData.Configs['XX_289_D_VND_LC_SINGLE'], [ encodeURIComponent( jwt.invoice.header.XX_HDR_VI + jwt.invoice.header.XX_HDR_VL ) ]);
      }else{
          //the no vendor location check box
          jwt.functions.setupNLCheck( jwt.functions.setupNLCheck );
      }

     //the alternate branch is followed and then reset
     if (config.useAlternateCallback == true) {
         config.useAlternateCallback = false;
         config.callbackAlternate();
     }

     //if there is an error bring the user to the top of the page using a jquery animation
     jQuery(".messages").on("hasError" , function(){
         jQuery("#component-data").animate({ scrollTop: 0 }, "fast");
     });

     // running edits here will display all the server errors using the error conroller logic
     jwt.routes.run_Edits( 'jwtComponentConfigFull' , jwt.invoice );

     //this method call will both display buttons and bind the clicks to those buttons based on the routes that are configured
     jwt.routes.xx_bind_buttons();

    // there is functionality to configure fields to drive display and edit properties
     var fieldList = _.filter( jwt.fields , function(obj){
             return obj.hasOwnProperty('canViewFunc' )
     });

     _.each( fieldList ,  function(obj){
             (  obj.canViewFunc() ) ?     jQuery( "." + obj.Definition ).remove() : "" });

     fieldList = _.filter( jwt.fields , function(obj){
             return obj.hasOwnProperty('canEditFunc' )
            });

     _.each( fieldList ,  function(obj){
             canEdit = obj.canEditFunc();
             (canEdit)? jwt.invoice.user.canEdit[obj.Definition] = "disabled" : "" ;  });

    //payent note needs some love
    if ( ! jQuery('#loc_XX_HDR_PY').val() ) {
             jQuery('#loc_XX_HDR_PY').select2("val" , "none");
         }

    if ( jQuery('#loc_XX_HDR_PY').val() != "none" ){
                 jQuery("#XX_HDR_PN").show();

    }else{ jQuery("#XX_HDR_PN").hide();  }


     jQuery('#loc_XX_HDR_PY').change(function(){
             if ( jQuery('#loc_XX_HDR_PY').val() != "none" ){
                         jQuery("#XX_HDR_PN").show();
                     }else{ jQuery("#XX_HDR_PN").hide();  }
                });

   // if we are sas we do some special stuff
    if (!jwt.user.isSAS){
            jQuery(".rf-hdr-pm").hide();
            jQuery(".rf-hdr-sb").hide();
            jQuery(".rf-hdr-hc").hide();
            jQuery(".rf-hdr-hf").hide();
    }

    if (jwt.user.isLocked || !jwt.user.isSAS ){
        jQuery(".vl-check").hide();
    }

    // line two section logic
    // there are two lines per charge row that can be shown to the user
    // the second line for each charge row is usually hidden
    // the second row can show asset or quantity information
    // the line quantity and unit price inputs are added and stored in the ma field on the first line
    // ma is monetary amount
    jQuery('.rf-lin-lq > input , .rf-lin-up > input').on('change', function() {
      var rowID = jQuery( this ).data( "row-id" )
      var totamt =  parseInt(jQuery( ".rf-lin-lq > input[data-row-id='"   +  rowID +  "']"  ).val()  ) * parseInt( jQuery( ".rf-lin-up > input[data-row-id='"   +  rowID +  "']"  ).val()  ) ;
      totamt = isNaN( totamt ) ? 0 : totamt ;
      jQuery( ".rf-lin-ma > input[data-row-id='"   +  rowID +  "']"  ).val(totamt.toFixed(2) ? totamt.toFixed(2) : 0 ).prop( "disabled", true );
      jwt.functions.addlines();
        });

      //hide the lines first
      jQuery(".line2").hide();

      //the two flags drive the showing of the second line on the row
      var foundlines = _.filter(jwt.lines, function(obj) {  return obj.XX_LIN_AO == "N" || obj.XX_LIN_AF == "Y" || obj.XX_LIN_AP || obj.XX_LIN_AI  });

      _.each( foundlines ,  function(obj){
            //for each row that has a amount only NO or an asset YES do the following
             var rowID = obj.ROW;

             //unhide the line and disable the inputs
             jQuery(".line2[data-row-id='"   +  rowID +  "']" )
                   .show()
                   // .find( ".rf-lin-ii > input , .rf-lin-um > input , .rf-lin-lq > input , .rf-lin-up > input , .rf-lin-ai > input , .rf-lin-ap > input " )
                   // .attr("disabled" , "disabled");

           // AO or amount only is the equivalent of a quantity based PO
           // quantity based PO will show the line two feilds as editable inputs
           // also disable the line one ma field..monetary amount
             if (obj.XX_LIN_AO == "N"   ) {
                 jQuery(".line2[data-row-id='"   +  rowID +  "']" )
                     .find( ".rf-lin-ii > input , .rf-lin-um > input , .rf-lin-lq > input , .rf-lin-up > input" )
                     .attr("disabled" , false);
                 jQuery( ".rf-lin-ma > input[data-row-id='"   +  rowID +  "']"  ).prop( "disabled", true );
             }

           // af is asset only flag.  show the asset fields
           if (jwt.user.isSAS){
                 if (obj.XX_LIN_AF == "Y"  ||
                     jQuery(".line2[data-row-id='"   +  rowID +  "']" ).find( ".rf-lin-ai > input,  .rf-lin-ap > input" ).filter( function(){ return this.value}).length > 0){
                      jQuery(".line2[data-row-id='"   +  rowID +  "']" )
                         .find( ".rf-lin-ai > input,  .rf-lin-ap > input" )
                         .prop( "disabled", false );
                 }
            }
     });
     //show the fields on click event
     if (jwt.user.isSAS){
          jQuery(".show-asset").on("click" , function(){
                var obj = jQuery( this);
                var rowID = obj.data( "row-id");
                jQuery(".line2[data-row-id='"   +  rowID +  "']" ).show() ;
                jQuery(".line2[data-row-id='"   +  rowID +  "']" ).find( ".rf-lin-ai > input,  .rf-lin-ap > input" ).prop( "disabled", false );
                jQuery(".line2[data-row-id='"   +  rowID +  "']" ).find( ".rf-lin-ai > div,  .rf-lin-ap > div" ).select2("enable" , true );
          });
    }

      jQuery(".show-qty").on("click" , function(){
            var obj = jQuery( this);
            var rowID = obj.data( "row-id");
            jQuery(".line2[data-row-id='"   +  rowID +  "']" ).show() ;
            jQuery(".line2[data-row-id='"   +  rowID +  "']" ).find( ".rf-lin-ii > input , .rf-lin-um > input , .rf-lin-lq > input , .rf-lin-up > input" ).attr("disabled" , false);
            jQuery(".line2[data-row-id='"   +  rowID +  "']" ).find( ".rf-lin-ii > div , .rf-lin-um > div" ).select2("enable" , true );
      });

    //the end of the line two logic
    //the end of the call back...
    //control to the user
    }
  }
})();
