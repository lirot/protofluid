jwt.jwtData.Configs = {};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
jwt.jwtData.Configs['XX_289_WL_SAS9'] = (function() {
  return {
    Definition: 'XX_289_WL_SAS9',
    xxData: jQuery({}),
    reference: "INSTANCEID",
    is_lunr_search: true,
    LunrNumKey: "",
      keyfields: ["INSTANCEID",
		  "SHEET_STATUS",
		  "XX_DTTM2_CHAR",
		  "NAME",
		  "AMOUNT",
		  "PROJECT_TYPE",
		  "VENDOR_NAME",
		  "XX_INV_DATE_CHAR",
		  "INVOICE_ID",
		  "XX_DTTM_CHAR",
		  "BUSINESS_UNIT"],
    s2optionsDO: {},
    qryString1: {
      "ViewName": "XX_289_WL_SAS9",
      "CoumnList": [{
        "Column_Name": "INSTANCEID",
        "Column_Value": "1",
        "Operator": ">"
      }]
    }
  };
})();

jwt.jwtData.Configs['XX_289_D_VND_LC_SINGLE'] = (function() {
  return {
    Definition: 'XX_289_D_VND_LC_SINGLE',
    xxData: jQuery({}),
    qryString1: {
      "ViewName": "XX_289_D_VND_LC",
      "CoumnList": [{
        "Column_Name": "KEY1",
        "Column_Value": "",
        "Operator": "="
      }]
    },
    callback: function(jsonObj, config) {
      //on the return set the page value for display
      var data = jwt.jwtData.XX_289_D_VND_LC_SINGLE["_" + encodeURIComponent(jwt.invoice.header.XX_HDR_VI + jwt.invoice.header.XX_HDR_VL).hashCode().toString()];

    if ( data.VENDOR_STATUS == "I"){
        data.VENDOR_STATUS = "Inactive";
       }
 if ( data.VENDOR_STATUS == "A"){
        data.VENDOR_STATUS = "Active";
       }

      var ret = jwt.jwtData.decode(data);
      var outHTML = jwt.Mustache.to_html(jwt.templates['VENDOR_INFO'], data);
      jQuery('#loc_vendorInfo #addressInfo').html(outHTML);
    }
  };
})();

jwt.jwtData.Configs['XX_289_D_VND_LC'] = (function() {
return {
Definition: 'XX_289_D_VND_LC',
xxData: jQuery({}),
    searchText: "Vendor Search",
    /* properties used by lunr search library
    * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not
    // as bright - 0.5.7
    * Copyright (C) 2014 Oliver Nightingale
    */
reference: "KEY1",
is_lunr_search: true,

qry_term_overide: function(term ){
            // only show vendor locations for a prarticular vendor on the page
     if ( jwt.functions.hasVendor()) {
              var vendorID = jwt.functions.hasVendor();
              return "v:" + vendorID.toString();
     }
    return term;
},

    //used to pad leading zeros if number is entered to the search
LunrNumKey: "VENDOR_ID:10",

    // key fields used to create lunr searchable keys...the boost value is
    // the second split value
keyfields: [
	  'VENDOR_ID:100',
	  'NAME1:100',
	  'VENDOR_NAME_SHORT',
	  'VNDR_LOC',
	  'CITY',
	  'STATE',
	  'ADDRESS1',
	  'POSTAL'],
      
      // a drict key will allow direct access to a value with the
    //prefix...to find an esact match on vendor id type 'v:'' and the vednor id
directkeyfields: ['VENDOR_ID:v'],

      // object set with default values in the parse routine and those
      //values used by s2 constructor on page build
      // options will instruct constructor to use a data query for the
      //source of the drop down
      // the lunar config will aid in seraching the indexes for the live searches
s2optionsDO: {},

      // used by xxAJAX function column list can have two column_Name
      //objects and or use a function see  XX_289_D_PRJ_01 for
      // a two field query string
qryString1: {
      "ViewName": "XX_289_D_VND_LC",
      "CoumnList": [{
        "Column_Name": "VENDOR_SETID",
        "Column_Value": "",
        "Operator": "="
      }]
    },

      //select 2 will call this method after the query results are known when
      //the user is typeing in to the input field
      //the data returned by the search will pass through the template
      //before being displayed to the user
select2Callback: function(data) {
         jwt.jwtData.decode(data);
    if ( data.VENDOR_STATUS == "I"){
        data.VENDOR_STATUS = "Inactive";
       }
 if ( data.VENDOR_STATUS == "A"){
        data.VENDOR_STATUS = "Active";
       }

      var outHTML = jwt.Mustache.to_html(jwt.templates['SELECT2_VENDOR'], data);
    return outHTML;
     },
      
      //after the user selects a value from the select2 list this function is
      //called the return value is placed in the
      //select box and displayed to the userd
select2Display: function(data) {
      if (jwt.jwtWorkList.isFullPage) {
        jQuery('.ps-no-loc').removeClass("ps-hidden");
          return 'Location';
          // return 'Vendor ID: ' + data.VENDOR_ID;
      } else {
        return 'Vendor ID: ' + data.VENDOR_ID + ' ' + decodeURIComponent(data.NAME1);
      }
    },

    //the user clears the select2 drop down and this function is called
clear: function() {
      jQuery('#XX_HDR_VI').val("");
      jQuery('#XX_HDR_VL').val("");
      jwt.invoice.header.XX_HDR_VI = "";
      jQuery('.NL-check').prettyCheckable('uncheck');
      jQuery(".vl-check").addClass("displayHidden");
      jQuery('#loc_vendorInfo #addressInfo').html("");
      jwt.jwtData.Configs['XX_289_D_PO_02'].loc_S2_XX_LIN_PO();
    },

    // the user selects a value from the drop down and this function is called
    // the developer must set the inputs sent back to the server here
select2setKeys: function(data) {
      jQuery(".vl-check").removeClass("displayHidden");
      jQuery('.NL-check').prop('checked', false);
      jQuery('#XX_HDR_VI').val(data.VENDOR_ID);
      jQuery('.NL-check').prettyCheckable('uncheck');
    jQuery('#XX_HDR_VL').val(decodeURIComponent(data.VNDR_LOC));
    var outHTML;
      if (jwt.jwtWorkList.sActivePage == 'jwt.jwtComponentConfigFull') {
        outHTML = jwt.Mustache.to_html(jwt.templates['VENDOR_INFO'], data);
        jQuery('#loc_vendorInfo #addressInfo').html(outHTML);
      } else {
        outHTML = jwt.Mustache.to_html(jwt.templates['VENDOR_INFO'], data);
        jQuery('#loc_vendorInfo #addressInfo').html(outHTML);
      }
    },

      /* the framework will call loc_S2* method to build the S2 control if
     the hidden input on the page has an id
     with the same name as this method
     this method must also set the value of the field on the drop down and
      set the clear event on the page
      to call the clear method on this object
     the select2-open event will run the select@PreQuery method which will
      allow for eventing when the user
     first clicks on a drop down for cases like dislaying all the
      values to a user, or showing only PO for a
     specific vendor...the drict keys as wel as code added to the
      pipeline funtion makes this functionality
     easier to implement */

loc_S2_XX_HDR_VI: function() {
      //create the select2 with defaults
      var config = jwt.jwtData.Configs['XX_289_D_VND_LC'];

      jQuery("#loc_S2_XX_HDR_VI")
	  .select2(config.s2optionsDO)
        .off("select2-open")
        .on("select2-removed", function(e) {
          jwt.jwtData.Configs['XX_289_D_VND_LC'].clear();
          })
        .on("select2-open",
          function(e) {
            jwt.functions.select2PreQuery(this);
            jQuery("#image-now").css("width", "0%");
            jQuery(".vi-drop1").css("left", "10%");
            jQuery(".vi-drop1").css("width", "90%");
            var outHTML =
            jwt.Mustache.to_html(
		      jwt.templates['SELECT2_ADD_HEADER'], config);
            jQuery('.select2-input').before(outHTML);
              var outHTML =
		  jwt.Mustache.to_html(
		      jwt.templates['SELECT2_ADD_FOOTER'], config);
            jQuery('.select2-input').after(outHTML);
            jwt.functions.select2PreQuery(this);
            jQuery(".select2-input").focus();
          })
        .on("select2-close",
          function(e) {
            jQuery("#image-now").css("width", "40%");
            jQuery("#component-data").css("width", "60%");
            jQuery(".select2-search ." + config.Definition).remove();
          });
      
      //now add data source dependent on the elements configuration
      if (jwt.invoice.header.XX_HDR_VI &&
	  jwt.invoice.header.XX_HDR_VL) {
          jQuery("#loc_S2_XX_HDR_VI")
	      .select2("data",
		       jwt.jwtData.setPromptVal(
			   encodeURIComponent(jwt.invoice.header.XX_HDR_VI +
					       jwt.invoice.header.XX_HDR_VL),
			   'XX_289_D_VND_LC'));
      }

      //trick to hide the clear abbr element
      if (jwt.user.hasPO) {
          jQuery("#s2id_loc_S2_XX_HDR_VI .select2-search-choice-close")
	      .css("right", "0px");
      } else {
          jQuery("#s2id_loc_S2_XX_HDR_VI .select2-search-choice-close")
	      .css("right", "24px");
      }
    },

select2lunrPreQuery: function(config, elem) {
	//at this point the user has just clicked the drop down.
	// these conditions are then checked
	if ((config.Definition == "XX_289_D_VND_LC" ||
	      config.Definition == "XX_289_D_PO_02") &&
	    jwt.functions.hasVendor) {
        //run a quick function to pre populate the drop down
        jQuery(".select2-input").val("all:all");
        jQuery(elem).select2("updateResults", true);
        // reset the drop down input to blank
        jQuery(".select2-input").val("");
      }
    },

lunrPipelineFunction: function(token) {
      // lunar will run this function
	// adding a funtction with this name on any data object will create
	// a call from within the lunr pipeline
	//in this function values in the elements list are bypassed
      var elements = '000000 00000 000 00 0 0000'.split(' ');
      if (elements.indexOf(token) !== -1) {
        return undefined;
      }

      //for vendor location searches zeros are padded to numbers
      config = jwt.jwtData.Configs['XX_289_D_VND_LC'];
      if (!isNaN(+token) && isFinite(token)) {
        if (config.LunrNumKey) {
          return jwt.functions.pad(token, config.LunrNumKey.split(':')[1]);
        }
      }
      if (token.length <= 2) return undefined; //tokens of length less then 3

      return token;
    }
};
})();


jwt.jwtData.Configs['XX_289_D_PRJ_01'] = (function() {
  return {

    Definition: 'XX_289_D_PRJ_01',
    searchText: "Project Search",
    xxData: jQuery({}),
    reference: "PROJECT_ID",
    is_lunr_search: true,
    LunrNumKey: "",
      keyfields: ['PROJECT_ID:100',
		  'XX_CUST_NAME_LONG:100',
		  'XX_CUST_NAME_SHORT',
		  'XX_PRODUCT',
		  'PROJECT_TYPE',
		  'XX_MEDIA_TYPE_ID',
		  'PROJ_DESCR',
		  'XX_PRJ_OWNER_NAME',
		  'DEPTID',
		  'DEPTID_DESCR',
		  'BUSINESS_UNIT'],

    s2optionsDO: {},

  qryString1: function() {
      if (jwt.jwtWorkList.glbUserType == 'S') {
        return {
          "ViewName": "XX_289_D_PRJ_01",
          "CoumnList": [{
            "Column_Name": "BUSINESS_UNIT",
            "Column_Value": "",
            "Operator": "="
          }]
        };
      } else {
        return {
          "ViewName": "XX_289_D_PRJ_01",
          "CoumnList": [{
            "Column_Name": "BUSINESS_UNIT",
            "Column_Value": "",
            "Operator": "="
          }, {
            "Column_Name": "XX_SAS_FLAG",
            "Column_Value": "N",
            "Operator": "="
          }]
        };
      }
    },

    select2Callback: function(data) {
      jwt.jwtData.decode(data);
      var outHTML = jwt.Mustache.to_html(jwt.templates.SELECT2_PROJECT, data);
        return outHTML;
    },

   select2Display: function(data) {
       return data.PROJECT_ID;
    },

   select2setKeys: function(data) {
      jwt.routes.loc_S2_XX_LIN_PI.serverFunction(data);
    },

   loc_S2_XX_LIN_PI: function() {
       function f(){
                dothis();
         }
       //short wait here makes a difference as the definitions
       //catch up with the data on a user who is quick to the
       //first invoice.
       setTimeout(f, 500);

	// builds all the custom select2 objects marked with data attribute
        function dothis() {

       var config = jwt.jwtData.Configs.XX_289_D_PRJ_01;
            jQuery("#loc_S2_XX_LIN_PI").select2(config.s2optionsDO)
        .off("select2-open")
        .on("select2-open",
          function(e) {
            jQuery("#image-now").css("width", "0%");
            jQuery(".p1-drop1").css("left", "10%");
            jQuery(".p1-drop1").css("width", "90%");
            var outHTML =
            jwt.Mustache.to_html(
		      jwt.templates.SELECT2_ADD_HEADER, config);
            jQuery('.select2-input').before(outHTML);
              var outHTML =
		  jwt.Mustache.to_html(
		      jwt.templates.SELECT2_ADD_FOOTER, config);
            jQuery('.select2-input').after(outHTML);
            jwt.functions.select2PreQuery(this);
            jQuery(".select2-input").focus();
          })
        .on("select2-close",
          function(e) {
            jQuery("#image-now").css("width", "40%");
            jQuery("#component-data").css("width", "60%");
            jQuery(".select2-search ." + config.Definition).remove();
          });
        }
    }

  };
})();

jwt.jwtData.Configs.XX_289_D_PO_02 = (function() {
  return {
    Definition: 'XX_289_D_PO_02',
    searchText: "PO Search",
    xxData: jQuery({}),
    reference: "PO_ID",
    is_lunr_search: true,
      LunrNumKey: "",

      qry_term_overide: function( term ){
      //only show po for the vendor on the page
              if ( jwt.functions.hasVendor()) {
              var vendorID = jwt.functions.hasVendor();
              return  "v:" + vendorID.toString();
              }
          return term;
      },

    keyfields: [  'PO_ID:100',
		  'VENDOR_ID:100',
		  'NAME1',
		  'XX_PO_ENTERED_BY',
		  'XX_DTTM_CHAR',
		  'XX_PO_STATUS_DESCR',
		  'XX_CUST_NAME_LONG',
		  'XX_CUST_NAME_SHORT',
		  'XX_PRODUCT',
		  'XX_MEDIA_TYPE_ID',
		  'PROJECT_ID',
		  'PROJ_DESCR',
		  'XX_PRJ_OWNER_NAME',
		  'DEPTID',
		  'DEPTID_DESCR'],
      
    directkeyfields: ['VENDOR_ID:v'],
    s2optionsDO: {},
    qryString1: {
        "ViewName"    : "XX_289_D_PO_02",
        "CoumnList"   : [{
        "Column_Name" : "KEY1"   ,
        "Column_Value": ""       , 
        "Operator"    : "="
      }]
    },

    select2Callback: function(data) {
      jwt.jwtData.decode(data);
      var outHTML = jwt.Mustache.to_html(jwt.templates.SELECT2_PO, data);
        return outHTML;
    },

    select2Display: function(data) {
        return data.PO_ID;
    },

    clear: function() {
        jwt.jwtData.Configs.XX_289_D_VND_LC.clear();
      jQuery('#loc_XX_HDR_FA').select2("val", "");
        jQuery('#loc_XX_HDR_SO').select2("val", "");
        jQuery("#s2id_loc_S2_XX_HDR_VI .select2-search-choice-close")
	    .css("right", "24px");
    },

    select2setKeys: function(data) {

      //the change of the po id will call a server function	
	jwt.routes.loc_S2_XX_LIN_PO.serverFunction(data);

	//the first approver value is set
	jQuery('#loc_XX_HDR_FA').select2();

	//the header bu is set
	jQuery('#loc_S2_XX_HDR_BU')
	    .select2("data", jwt.jwtData.setPromptVal(
		data.BUSINESS_UNIT, 'XX_289_D_BU_SEC'));
	//the header ship to is set
	jQuery('#loc_S2_XX_HDR_SO')
	    .select2("data", jwt.jwtData.setPromptVal(
		data.SHIPTO_ID, 'XX_289_D_SHIPTO'));

     if (jwt.jwtData.XX_289_D_APPROV
	    .hasOwnProperty("_" +
		 data.XX_BILL_TO_CONTACT.hashCode().toString())) {
            jQuery('#loc_S2_XX_HDR_FA')
		.select2("data",
			 jwt.jwtData.setPromptVal(
			     data.XX_BILL_TO_CONTACT,
			     'XX_289_D_APPROV', 'OPRID'));
      }

      jQuery('#loc_S2_XX_HDR_VI')
	    .select2("data", jwt.jwtData.setPromptVal(
		encodeURIComponent(data.VENDOR_ID +
				    data.VNDR_LOC), 'XX_289_D_VND_LC'));
	
      jQuery("#s2id_loc_S2_XX_HDR_VI .select2-search-choice-close")
	    .css("right", "0px");

    },

    loc_S2_XX_LIN_PO: function() {
      var config = jwt.jwtData.Config.XX_289_D_PO_02;
      jQuery("#loc_S2_XX_LIN_PO").select2(config.s2optionsDO)
        .off("select2-open")
        .on("select2-open",
          function(e) {
            jQuery("#image-now").css("width", "0%");
            jQuery(".po-drop1").css("left", "10%");
            jQuery(".po-drop1").css("width", "90%");
            var outHTML =
		  jwt.Mustache.to_html(
		      jwt.templates.SELECT2_ADD_HEADER, config);
            jQuery('.select2-input').before(outHTML);
              var outHTML =
		  jwt.Mustache.to_html(
		      jwt.templates.SELECT2_ADD_FOOTER, config);
            jQuery('.select2-input').after(outHTML);
            jwt.functions.select2PreQuery(this);
            jQuery(".select2-input").focus();
          })
        .on("select2-close",
          function(e) {
            jQuery("#image-now").css("width", "40%");
            jQuery("#component-data").css("width", "60%");
            jQuery(".select2-search ." + config.Definition).remove();
          })
        .on("select2-removed", function(e) {
          jwt.jwtData.Configs.XX_289_D_PO_02.clear();
        });
    },

    select2lunrPreQuery: function(config, elem) {
	if ((config.Definition == "XX_289_D_VND_LC" ||
	     config.Definition == "XX_289_D_PO_02") &&
	     jwt.functions.hasVendor()) {
        jQuery(".select2-input").val("v:" + jwt.functions.hasVendor());
        jQuery(elem).select2("updateResults", true);
        jQuery(".select2-input").val("");
      }
    },

    lunrPipelineFunction: function(token) {
      var config = jwt.jwtData.Configs.XX_289_D_PO_02;
      var elements = '000000 00000 000 00 0 0000'.split(' ');
      if (elements.indexOf(token) !== -1) {
        return undefined;
      }
      if (!isNaN(+token) && isFinite(token)) {
        if (config.LunrNumKey) {
          return jwt.functions.pad(token, config.LunrNumKey.split(':')[1]);
        }
      }
      if (token.length <= 2) return undefined; //tokens of length less then 3
      return token;
    }

  };
})();

jwt.jwtData.Configs.XX_289_D_SC_01 = (function() {
  return {
    Definition: 'XX_289_D_SC_01',
    xxData: jQuery({}),
    reference: "RESOURCE_SUB_CAT",
    is_lunr_search: true,
    is_lunr_show_all: true,
    dropDownMax: true,

    postSearchFunction : function( results , elem ){

          var row = jQuery( elem ).data("row-id") ;
          var listsubCat  = _.find( jwt.invoice.user.subCatValidArray , function(str){
              return str.indexOf( row ) != -1;
          });
          
          var subCatArray = listsubCat.split(":")[1].split(",");

          console.log( "Valid sub cats for row: " + row + "  "  + subCatArray.length );
    
          var arraySC =  _.filter( results , function( obj ){
              return subCatArray.indexOf( obj.ref ) != -1;
          } );
          
          console.log( "Valid sub cats for row: " + row + "  "  + arraySC.length );
          
        return arraySC;

                },
    LunrNumKey: "",
    keyfields: ['RESOURCE_SUB_CAT:100',
		  'RES_SUB_CAT_DESCR:100',
		  'RESOURCE_CATEGORY',
		  'RES_CAT_DESCR'],
      
      lunrSortFunction : function(arr ){
       var arrRET  =  _.sortBy(arr ,'ref');

          return arrRET;
      },
      
    s2optionsDO: {},
      
    qryString1: {
	"ViewName": "XX_289_D_SC_01",
      "CoumnList": [{
        "Column_Name": "BUSINESS_UNIT",
        "Column_Value": "",
        "Operator": "="
      }]
    },

    clear: function(elem) {
        jQuery(elem).next().val("");
    },

    select2Display: function(data, $elem) {
	return (data) ?
	    decodeURIComponent(data.RESOURCE_SUB_CAT) : $elem.next().val();
    },

    select2Callback: function(data) {
      jwt.jwtData.decode(data);
      var outHTML = jwt.Mustache.to_html(jwt.templates.SELECT2_SC, data);
        return outHTML;
    },

    select2setKeys: function(data, $elem) {
      if (data) {
        if (data.RESOURCE_SUB_CAT != $elem.next().val()) {
          $elem.next().val(data.RESOURCE_SUB_CAT);
            if ($elem.parent().parent().next().find("input[id^='XX_LIN_LD']").val() === "") {
                $elem.parent().parent().next()
		  .find("input[id^='XX_LIN_LD']")
		  .val(decodeURIComponent(data.RES_SUB_CAT_DESCR));
          }
        }
      }
    },

    select2lunrPreQuery: function(config, elem) {

// 

        if ((config.Definition == "XX_289_D_VND_LC" ||
	     config.Definition == "XX_289_D_PO_02") &&
	    jwt.functions.hasVendor()) {
        jQuery(".select2-input").val("v:" + jwt.functions.hasVendor());
        jQuery(elem).select2("updateResults", true);
        jQuery(".select2-input").val("");
      }
    },


   lin_S2_XX_LIN_SC: function(obj) {
      var config = jwt.jwtData.Configs.XX_289_D_SC_01;
    //build the select2 drop down with the configuration
                          
       obj.select2(jwt.jwtData.s2optionsDO)
           .on("select2-open",  function(e) {
               jwt.functions.select2PreQuery(this);})
           .on("select2-clearing", function(e) {
               //call the clear function on the object
               jwt.jwtData.Configs.XX_289_D_SC_01.clear(this); });
               if (obj.next().val()) {
                   obj.select2("data", jwt.jwtData.setPromptVal(
                       encodeURIComponent(obj.next().val()), 'XX_289_D_SC_01')
                );}
    }
  };
})();

jwt.jwtData.Configs.XX_289_D_APPROV = (function() {
  return {
    Definition: 'XX_289_D_APPROV',
    xxData: jQuery({}),
    reference: "OPRID",
    is_lunr_search: true,
    LunrNumKey: "",
      keyfields: ['OPRID:100',
		  'OPRDEFNDESC',
		  'PERSON_NAME',
		  'BUSINESS_UNIT',
		  'LAST_NAME',
		  'FIRST_NAME',
		  'STATUS_DESCR'],

    s2optionsDO: {},
    qryString1: {
      "ViewName": "XX_289_D_APPROV",
      "CoumnList": [{
        "Column_Name": "KEY1",
        "Column_Value": "",
        "Operator": "="
      }]
    },

   clear: function() {
      jQuery("input[name='XX_HDR_FA']").val("");
   },
      
    select2Callback: function(data) {
      if (!data) {
          return;
      }
	var outofofficevar = data.REASSIGNOPRID ?
	    ' <font color="red"><b> ! office </b></font>' +
	    decodeURIComponent(data.DESCR120) : ' ';
	return decodeURIComponent("<div><div>" +
	    data.PERSON_NAME) + ' - ' +
	    decodeURIComponent(data.STATUS_DESCR) +
	    ' - ' + decodeURIComponent(data.BUSINESS_UNIT) +
	    outofofficevar + "</div></div>";
    },
      
    select2setKeys: function(data) {
	return (data) ?
	    jQuery("input[name='XX_HDR_FA']").val(data.OPRID) :
	    jQuery("input[name='XX_HDR_FA']").val("");
    },
      
    select2Display: function(data) {
      if (!data) {
          return;
      }
	var outofofficevar = data.REASSIGNOPRID ?
	    ' <font color="red"><b> out of office  </b></font>' +
	    decodeURIComponent(data.DESCR120) : ' ';
	return decodeURIComponent(data.PERSON_NAME) +
	    ' - ' + decodeURIComponent(data.STATUS_DESCR) +
	    ' - ' + decodeURIComponent(data.BUSINESS_UNIT);
    },

    loc_S2_XX_HDR_FA: function() {
        var config = jwt.jwtData.Configs.XX_289_D_APPROV;

      jQuery('#loc_S2_XX_HDR_FA').select2(config.s2optionsDO)
        .on("select2-clearing",
          function(e) {
            jwt.jwtData.Configs.XX_289_D_APPROV.clear();
          });

      if (jwt.invoice.header.XX_HDR_FA) {
          jQuery("#loc_S2_XX_HDR_FA")
	      .select2("data", jwt.jwtData.setPromptVal(
		  encodeURIComponent(jwt.invoice.header.XX_HDR_FA),
		  'XX_289_D_APPROV'));
      }
    }
  };
})();

// approver drop down is on the approval modal page
jwt.jwtData.Configs.XX_APPROVERS = (function() {
  return {
    Definition: 'XX_APPROVERS',
    xxData: jQuery({}),
    reference: "OPRID",
    is_lunr_search: true,
    LunrNumKey: "",
      keyfields: ['OPRID:100',
		  'OPRDEFNDESC',
		  'PERSON_NAME',
		  'BUSINESS_UNIT',
		  'LAST_NAME',
		  'FIRST_NAME',
		  'STATUS_DESCR'],

    directkeyfields: ['canApprove:CA'],
    s2optionsDO: {},
    qryString1: {
      "ViewName": "XX_289_D_APPROV",
      "CoumnList": [{
        "Column_Name": "KEY1",
        "Column_Value": "",
        "Operator": "="
      }]
    },

    select2Callback: function(data) {
      if (!data) {
          return;
      }
      jwt.jwtData.decode(data);
	var outHTML = jwt.Mustache
	    .to_html(jwt.templates.SELECT2_XX_APPROVER, data);
        return outHTML;
    },
      
    select2setKeys: function(data) {
      var obj = {
        'name': decodeURIComponent(data.OPRDEFNDESC),
        'id': data.OPRID,
        'canApprove': data.canApprove
      };
      var template = jwt.templates.APPROVER_ADD_LIST;
      var outHTML = jwt.Mustache.to_html(template, obj);
      jQuery("#APPROVER_ADD_LIST").append(outHTML);
      jwt.functions.editApproverList();
    },
      
    select2Display: function(data) {
        return '<font color="blue"><b> Add another approver  </b></font>';
    },

    loc_S2_APPROVER: function() {
      var config = jwt.jwtData.Configs['XX_APPROVERS'];
      jQuery('#loc_S2_APPROVER').select2(config.s2optionsDO).on("select2-open",
        function(e) {
          jwt.functions.select2PreQuery(this);
        });

    }
  };
})();

jwt.jwtData.Configs.XX_289_D_BU_SEC = (function() {
  return {

    Definition: 'XX_289_D_BU_SEC',
    xxData: jQuery({}),
    reference: "BUSINESS_UNIT",
    is_lunr_search: true,
    is_lunr_show_all: true,
    LunrNumKey: "",
    keyfields: ['BUSINESS_UNIT:100', 'DESCR'],
    s2optionsDO: {},

    // the data controller callback after the ajax post
    callback: function(config) {
      //on the return gets the projects
      var buArray = [];
        for (p in jwt.jwtData.XX_289_D_BU_SEC) {
            //projects are fetched by business unit build an array
        buArray.push(jwt.jwtData.XX_289_D_BU_SEC[p].BUSINESS_UNIT);
      }
	jwt.jwtData.init('XX_289_D_PRJ_01',
			 jwt.jwtData.Configs.XX_289_D_PRJ_01, buArray);
    },

    qryString1: {
      "ViewName": "XX_BU_SEC_SORT",
      "CoumnList": [{
        "Column_Name": "OPRID",
        "Column_Value": "",
        "Operator": "="
      }]
    },

    clear: function() {
      jQuery("input[name='XX_HDR_BU']").val("");
    },
      
    select2Display: function(data) {
	return (data)
	    ? decodeURIComponent(data.DESCR) : jwt.invoice.header.XX_HDR_BU;
    },
      
    select2setKeys: function(data) {
      if (data) {
        jQuery("input[name='XX_HDR_BU']").val(data.BUSINESS_UNIT);
      }
    },
      
    select2Callback: function(data) {
      return decodeURIComponent("<div><div>" + data.DESCR + "</div></div>")
    },
      
    loc_S2_XX_HDR_BU: function() {
      var config = jwt.jwtData.Configs['XX_289_D_BU_SEC'];
      config.s2optionsDO.allowClear = false;
      jQuery("#loc_S2_XX_HDR_BU").select2(config.s2optionsDO).on("select2-open",
        function(e) {
          jwt.functions.select2PreQuery(this);
        }).on("select2-clearing",
        function(e) {
          jwt.jwtData.Configs['XX_289_D_BU_SEC'].clear();
        })
      if (jwt.invoice.header.XX_HDR_BU) {
          jQuery("#loc_S2_XX_HDR_BU")
	      .select2("data", jwt.jwtData.setPromptVal(
		  encodeURIComponent(jwt.invoice.header.XX_HDR_BU),
		  'XX_289_D_BU_SEC'));
      }
    }

  }
})();

jwt.jwtData.Configs['XX_289_D_SHIPTO'] = (function() {
  return {
    Definition: 'XX_289_D_SHIPTO',
    xxData: jQuery({}),
    reference: "SHIPTO_ID",
    is_lunr_search: true,
    is_lunr_show_all: true,
    LunrNumKey: "",
    keyfields: ['SHIPTO_ID:100', 'DESCR50'],
    s2optionsDO: {},
    qryString1: {
      "ViewName": "XX_289_D_SHIPTO",
      "CoumnList": [{
        "Column_Name": "SETID",
        "Column_Value": "",
        "Operator": "="
      }]
    },

    clear: function() {
      jQuery("input[name='XX_HDR_SO']").val("");
    },
      
    select2setKeysSOLine: function(data, $elem) {
      return (data) ? $elem.next().val(data.SHIPTO_ID) : $elem.next().val("");
    },
      
    select2setKeys: function(data) {
	return (data) ? jQuery("input[name='XX_HDR_SO']").val(
	    data.SHIPTO_ID) : jQuery("input[name='XX_HDR_SO']").val("");
    },

    select2Display: function(data) {
	return (data)
	    ? decodeURIComponent(data.SHIPTO_ID) : jwt.invoice.header.XX_HDR_SO;
    },

    select2Callback: function(data) {
	return "<div><div>" + data.SHIPTO_ID
	    + ' - ' + decodeURIComponent(data.DESCR50) + "</div></div>"
    },
      
    // the header has a ship to
    loc_S2_XX_HDR_SO: function() {
      var config = jwt.jwtData.Configs['XX_289_D_SHIPTO'];
      jQuery("#loc_S2_XX_HDR_SO").select2(config.s2optionsDO).on("select2-open",
        function(e) {
          jwt.functions.select2PreQuery(this);
        }).on("select2-removed",
        function(e) {
          jwt.jwtData.Configs['XX_289_D_SHIPTO'].clear();
        })

      if (jwt.invoice.header.XX_HDR_SO) {
          jQuery("#loc_S2_XX_HDR_SO")
	      .select2("data", jwt.jwtData
		       .setPromptVal(encodeURIComponent(
			   jwt.invoice.header.XX_HDR_SO), 'XX_289_D_SHIPTO'));
      }
    },
      
    //the line has a ship to
    lin_S2_XX_LIN_SO: function(obj) {
      var config = jwt.jwtData.Configs['XX_289_D_SHIPTO'];
      obj.select2(config.s2optionsDO).on("select2-open",
        function(e) {
          jwt.functions.select2PreQuery(this);
        }).on("select2-clearing",
        function(e) {
          jwt.jwtData.Configs['XX_289_D_SHIPTO'].clear(this);
        }).select2("data",
		   jwt.jwtData.setPromptVal(
		       encodeURIComponent(obj.next().val()), 'XX_289_D_SHIPTO')
      );
    }
  }
})();

jwt.jwtData.Configs['xx_po_rpt'] = (function() {
  return {
    callback: function(jsonObj, config) {
      var poid = unescape(jsonObj.VIEW[0].LINE[0]['PO_ID']);
      var data = jsonObj.VIEW[0].LINE[0];
      var openAmount = Number(data['OPEN_AMT']).formatMoney(2);
      jQuery("[data-po_id='" + poid + "']").find('.open-po').html(openAmount);
      jwt.jwtData.decode(data);
      var outHTML = jwt.Mustache.to_html(jwt.templates['TOOLTIP_PO_INFO'], data);
      jQuery('[data-link-id="' + poid + '"]').html(outHTML);
    },
    Definition: 'xx_po_rpt',
    xxData: jQuery({}),
    isContext: true,
    qryString1: {
      "ViewName": "XX_289_D_PO_03",
      "CoumnList": [{
        "Column_Name": "PO_ID",
        "Column_Value": "",
        "Operator": "="
      }]
    }
  }
})();

jwt.jwtData.Configs['xx_proj_attrtbl'] = (function() {
  return {
    Definition: 'xx_proj_attrtbl',
    xxData: jQuery({}),
    qryString1: {
      "ViewName": "XX_289_D_PRJ_02",
      "CoumnList": [{
        "Column_Name": "PROJECT_ID",
        "Column_Value": "",
        "Operator": "="
      }]
    }
  }
})();

jwt.jwtData.Configs['ASSET'] = (function() {
  return {
    Definition: 'ASSET',
    xxData: jQuery({}),
    reference: "ASSET_ID",
    is_lunr_search: true,
    LunrNumKey: "",
    keyfields: ['ASSET_ID:100', 'DESCR'],
    s2optionsDO: {},
    qryString1: {
      "ViewName": "ASSET",
      "CoumnList": [{
        "Column_Name": "BUSINESS_UNIT",
        "Column_Value": "",
        "Operator": "="
      }]
    },

      select2setKeys: function(data, $elem) {
      $elem.next().val(data.ASSET_ID);
    },

    select2Callback: function(data) {
	return "<div><div>" + data.ASSET_ID
	    + ' - ' + decodeURIComponent(data.DESCR) + "</div></div>"
    },

    select2Display: function(data) {
      return data.ASSET_ID
    },

    loc_S2_XX_LIN_AI: function(obj) {

      var config = jwt.jwtData.Configs['ASSET'];
      obj.select2(config.s2optionsDO).on("select2-clearing",
        function(e) {
          jQuery(this).next().val("")
        });
      if (obj.next().val()) {
        obj.select2("data",
		    jwt.jwtData.setPromptVal(encodeURIComponent(
			obj.next().val()), 'ASSET'))
      }
    }

  }
})();

jwt.jwtData.Configs['PROFILE_TBL'] = (function() {
  return {
    Definition: 'PROFILE_TBL',
    reference: "PROFILE_ID",
    is_lunr_search: true,
    LunrNumKey: "",
    keyfields: ['PROFILE_ID:100', 'DESCR'],
    xxData: jQuery({}),
    s2optionsDO: {},
    qryString1: {
      "ViewName": "PROFILE_TBL",
      "CoumnList": [{
        "Column_Name": "SETID",
        "Column_Value": "",
        "Operator": "="
      }]
    },
    select2setKeys: function(data, $elem) {
      $elem.next().val(data.PROFILE_ID);
    },
    select2Display: function(data) {
      return data.PROFILE_ID
    },
    select2Callback: function(data) {
	return "<div><div>" + data.PROFILE_ID
	    + ' - ' + decodeURIComponent(data.DESCR) + "</div></div>"
    },
      
    loc_S2_XX_LIN_AP: function(obj) {
      var config = jwt.jwtData.Configs['PROFILE_TBL'];
      obj.select2(config.s2optionsDO).on("select2-clearing",
        function(e) {
          jQuery(this).next().val("")
        });
      if (obj.next().val()) {
        obj.select2("data",
		    jwt.jwtData.setPromptVal(encodeURIComponent(obj.next()
				.val()), 'PROFILE_TBL'))
      }
    }
  }
})();

jwt.jwtData.Configs['XX_289_D_UNIT'] = (function() {
  return {
    Definition: 'XX_289_D_UNIT',
    reference: "UNIT_OF_MEASURE",
    is_lunr_search: true,
    is_lunr_show_all: true,
    LunrNumKey: "",
    keyfields: ['UNIT_OF_MEASURE:100', 'DESCR'],
    xxData: jQuery({}),
    s2optionsDO: {},

    qryString1: {
      "ViewName": "XX_289_D_UNIT",
      "CoumnList": [{
        "Column_Name": "KEY1",
        "Column_Value": "",
        "Operator": "="
      }]
    },

    select2setKeys: function(data, $elem) {
      $elem.next().val(data.UNIT_OF_MEASURE);
    },
    select2Callback: function(data) {
	return "<div><div>" + data.UNIT_OF_MEASURE
	    + ' - ' + decodeURIComponent(data.DESCRSHORT) + "</div></div>"
    },
    select2Display: function(data) {
      return data.UNIT_OF_MEASURE
    },
    loc_S2_XX_LIN_UM: function(obj) {
      var config = jwt.jwtData.Configs['XX_289_D_UNIT'];
      obj.select2(config.s2optionsDO).on("select2-open",
        function(e) {
          jwt.functions.select2PreQuery(this);
        }).on("select2-clearing",
        function(e) {
          jQuery(this).next().val("")
        })

      if (obj.next().val()) {
        obj.select2("data",
		    jwt.jwtData.setPromptVal(
			encodeURIComponent(obj.next().val()), 'XX_289_D_UNIT'))
      }
    }
  }
})();

jwt.jwtData.Configs['MASTER_ITEM_TBL'] = (function() {
  return {
    Definition: 'MASTER_ITEM_TBL',
    reference: "INV_ITEM_ID",
    is_lunr_search: true,
    is_lunr_show_all: true,
    LunrNumKey: "",
    keyfields: ['INV_ITEM_ID:100', 'DESCR'],
    xxData: jQuery({}),
    s2optionsDO: {},
    qryString1: {
      "ViewName": "MASTER_ITEM_TBL",
      "CoumnList": [{
        "Column_Name": "SETID",
        "Column_Value": "",
        "Operator": "="
      }]
    },

    select2setKeys: function(data, $elem) {
      $elem.next().val(data.INV_ITEM_ID);
    },
    select2Callback: function(data) {
	return "<div><div>" + data.INV_ITEM_ID
	    + ' - ' + decodeURIComponent(data.DESCR) + "</div></div>"
    },
    select2Display: function(data) {
      return data.INV_ITEM_ID
    },
      
    loc_S2_XX_LIN_II: function(obj) {
      var config = jwt.jwtData.Configs['MASTER_ITEM_TBL'];
      obj.select2(config.s2optionsDO).on("select2-open",
        function(e) {
          jwt.functions.select2PreQuery(this);
        }).on("select2-clearing",
        function(e) {
          jQuery(this).next().val("")
        })
      if (obj.next().val()) {
        obj.select2("data",
		    jwt.jwtData.setPromptVal(
			encodeURIComponent(obj.next().val()), 'MASTER_ITEM_TBL'))
      }
    }

  }
})();
