    jwt.jwtData.Configs['XX_WORKLIST_SEARCH'] = (function() {
      return {

        Definition: 'XX_WORKLIST_SEARCH',
        xxData: jQuery({}),

        /* properties used by lunr search library
         * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 0.5.7
         * Copyright (C) 2014 Oliver Nightingale
         */

        reference: "KEY1",
        is_lunr_search: true,

        //used to pad leading zeros if number is entered to the search
        LunrNumKey: "VENDOR_ID:10",


        //key fields used to create lunr searchable keys...the boost value is the second split value

        keyfields: ['VENDOR_ID:100', 'NAME1:100', 'VENDOR_NAME_SHORT', 'VNDR_LOC', 'CITY', 'STATE', 'ADDRESS1', 'POSTAL'],


        // a drict key will allow direct access to a value with the prefix...to find an esact match on vendor id type 'v:'' and the vednor id
        directkeyfields: ['VENDOR_ID:v'],

        // object set with default values in the parse routine and those values used by s2 constructor on page build
        // options will instruct constructor to use a data query for the source of the drop down
        // the lunar config will aid in seraching the indexes for the live searches

        s2optionsDO  : {} ,

        // used by xxAJAX function column list can have two column_Name objects and or use a function see  XX_289_D_PRJ_01 for
        // a two field query string
        qryString1: {
          "ViewName": "XX_289_D_VND_LC",
          "CoumnList": [{
            "Column_Name": "VENDOR_SETID",
            "Column_Value": "",
            "Operator": "="
          }]
        },

        //select 2 will call this method after the query results are known when the user is typeing in to the input field
        // the data returned by the search will pass through the template before being displayed to the user
        select2Callback: function(data) {
          jwt.jwtData.decode(data);
          data.VENDOR_STATUS = (data.VENDOR_STATUS == "I") ? "Inactive" : "Active"
          var outHTML = jwt.Mustache.to_html(jwt.templates['SELECT2_VENDOR'], data);
          return outHTML
        },

        //after the user selects a value from the select2 list this function is called the return value is placed in the
        // select box and displayed to the userd
        select2Display: function(data) {
          if (jwt.jwtWorkList.isFullPage) {
            jQuery('.ps-no-loc').removeClass("ps-hidden");
            return 'Vendor ID: ' + data.VENDOR_ID;
          } else {
            return 'Vendor ID: ' + data.VENDOR_ID + ' ' + decodeURIComponent(data.NAME1);
          }
        },

        //the user clears the select2 drop down and this function is called
        clear: function() {

          jQuery('#XX_HDR_VI').val("")
          jQuery('#XX_HDR_VL').val("")

          jQuery('.NL-check').prettyCheckable('uncheck');
          jQuery(".vl-check").addClass("displayHidden");

          jQuery('#loc_vendorInfo #addressInfo').html("");

        },

        // the user selects a value from the drop down and this function is called
        // the developer must set the inputs sent back to the server here
        select2setKeys: function(data) {
          jQuery(".vl-check").removeClass("displayHidden");
          jQuery('.NL-check').prop('checked', false);
          jQuery('#XX_HDR_VI').val(data.VENDOR_ID);
          jQuery('#XX_HDR_VL').val(decodeURIComponent(data.VNDR_LOC));

          if (jwt.jwtWorkList.sActivePage == 'jwt.jwtComponentConfigFull') {
            var outHTML = jwt.Mustache.to_html(jwt.templates['VENDOR_INFO'], data);
            jQuery('#loc_vendorInfo #addressInfo').html(outHTML);
          } else {
            var outHTML = jwt.Mustache.to_html(jwt.templates['VENDOR_INFO'], data);
            jQuery('#loc_vendorInfo #addressInfo').html(outHTML);

          }
      },

      the controller would call to here on init.

      loc_S2_XX_HDR_VI : function() {

          var config = jwt.jwtData.Configs['XX_289_D_VND_LC'];

          jQuery( "#loc_S2_XX_HDR_VI").select2(config.s2optionsDO).on("select2-open",
                       function(e) {
                        jwt.functions.select2PreQuery(this);
                       }).on("select2-removed", function(e) {
               jwt.jwtData.Configs['XX_289_D_VND_LC'].clear();
             })
         if ( jwt.invoice.header.XX_HDR_VI &&  jwt.invoice.header.XX_HDR_VL ){
             jQuery( "#loc_S2_XX_HDR_VI").select2("data", jwt.jwtData.setPromptVal(encodeURIComponent(jwt.invoice.header.XX_HDR_VI +  jwt.invoice.header.XX_HDR_VL), 'XX_289_D_VND_LC' )   );
         }

      }
