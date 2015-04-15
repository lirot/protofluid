//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// file:
// Descr:  Worklist tabs are defined specific to user type, sas or approver
//         Those definitions are read and the tabs and tables are created by
//          this loader object
//tablesorter plugin docs here http://mottie.github.io/tablesorter/docs/
jwt.jwtWorkList = (function() {

    //object builds the tabs and adds the events to the buttons
    //tabs are populated with tablesorter tables
    var sActivePage = '';
    var wlProcessedCnt = 0;
    var wlCounts = {};
    var wlActiveTab = 0;
    var wlRedFlg = '<img name="ERROR_ICON$IMG$0" title="Attention"'
        + 'alt="Attention" src="/cs/fsdev/cache/'
        + 'PS_PENNANT_FLAG_ICN_1.gif" border="0">';
    var wlSpinner = {};
    var wlActiveTabFirst = true;

var reset_Tabs = function(response, worklist) {
        jQuery(".close-image-now").show();
        jQuery(".component").css("display" , "block");
        
      jQuery("#image-now").css("width", "40%");
      jQuery("section#work-lists table").addClass('displayHidden');
      jQuery("section#work-lists table").removeClass('displayBlock');
      jQuery('#work-list-menu  li , .SearchInput')
	    .css('background-color', 'yellow').find('a').css('color','blue');
    //  jQuery('#work-list-menu  a, .SearchInput').css('color', 'white');
      jQuery('.wlHeader').css('display', 'none');
      jQuery('section#work-lists').css('display', 'none');
      jwt.stopCount();
    }

var wlCreatTable = function(response, worklist) {
      var jsondata = jQuery.parseJSON(response),
        tblheader = '',
        wlRow = '',
        wlTable,
        rowtmplt = '',
        hdricon = "",
        wlTableID = worklist.type + "-tbl-" + worklist.id,
        jsondata = jsondata.VIEW[0].LINE;

      //row count on tab
      var elem = jQuery(" [data-count-wlid= '" + worklist.id + "']");
      elem.text(jsondata.length.toString())

     //table header
      jQuery.each(worklist.fldlist, function(index, field) {
        tblheader = tblheader + '<th>' + field.fdescr + '</th>';
        rowtmplt = rowtmplt + field.fname;
      });

      var flag, important, locked, buttonHTML;

  jQuery.each(jsondata, function(index, item) {

	  locked = decodeURIComponent(item[worklist.wlLockField])
	      == jwt.user.operDescr ? 'N' : 'Y';
        locked = item[worklist.wlLockField] == '' ? 'N' : locked;
        important = item['XX_FLAG'] == 'Y' ? 'Y' : 'N';
        buttonHTML = "";

     if (jwt.user.isSAS) {
       if (worklist.id != "1") {
         if (worklist.id != "0") {
           buttonHTML = "<button class='loc_WL_UNLOCK_SAS_FULL' data-wl="
	       + worklist.id + "  data-imgNowKey=" + item[worklist.imgNowKey]
	       + " data-route-id='loc_WL_UNLOCK_SAS_FULL' type='button'"
	       + " data-key=" + item[worklist.key] + " data-imgNowKey="
	       + item[worklist.imgNowKey] + " data-locked=" + locked
	       + "></button>";
           buttonHTML = buttonHTML + "<button class='loc_WL_OPEN_SAS_FULL'"
	       + "data-wl=" + worklist.id + "  data-imgNowKey="
	       + item[worklist.imgNowKey] + " data-route-id='loc_WL_OPEN_SAS"
	       + "_FULL' type='button' data-key=" + item[worklist.key]
	       + " data-imgNowKey=" + item[worklist.imgNowKey]
	       + " data-locked=" + locked + "></button>";
           buttonHTML = buttonHTML + "<button class='loc_WL_VIEW_SAS_FULL'"
	       + "data-wl=" + worklist.id + "  data-imgNowKey="
	       + item[worklist.imgNowKey] + " data-route-id='loc_WL_VIEW"
	       + "_SAS_FULL' type='button' data-key=" + item[worklist.key]
	       + " data-imgNowKey=" + item[worklist.imgNowKey]
	       +" data-locked=" + locked + "></button>";
            } else {
              if (jwt.user.isIA) {
                  buttonHTML = "<button class='loc_WL_UNLOCK_SAS_FULL' data-wl="
		      + worklist.id + "  data-imgNowKey="
		      + item[worklist.imgNowKey]
		      + " data-route-id='loc_WL_UNLOCK_SAS_FULL' type='button'"
		      + "data-key=" + item[worklist.key] + " data-imgNowKey="
		      + item[worklist.imgNowKey] + " data-locked=" + locked
		      + "></button>";
              }
		buttonHTML = buttonHTML + "<button class='loc_WL_OPEN_SAS_FULL'"
		    + "data-wl=" + worklist.id + "  data-status="
		    + item["SHEET_STATUS"] + " data-imgNowKey="
		    + item[worklist.imgNowKey] + " data-route-id='loc_WL_OPEN"
		    + "_SAS_FULL' type='button' data-key=" + item[worklist.key]
		    + " data-imgNowKey=" + item[worklist.imgNowKey]
		    + " data-locked=" + locked + "></button>";
		buttonHTML = buttonHTML + "<button class='loc_WL_VIEW_SAS_FULL'"
		    + "data-wl=" + worklist.id + "  data-imgNowKey="
		    + item[worklist.imgNowKey] + " data-route-id='loc_WL_VIEW"
		    + "_SAS_FULL' type='button' data-key="
		    + item[worklist.key] + " data-imgNowKey="
		    + item[worklist.imgNowKey] + " data-locked=" + locked
		    + "></button>";
            }
          } else {
              buttonHTML = "<button class='loc_WL_UNLOCK_SAS_QUICK' data-wl="
		  + worklist.id + "  data-imgNowKey="
		  + item[worklist.imgNowKey]
		  + " data-route-id='loc_WL_UNLOCK_SAS_QUICK' type='button'"
	          + "data-key=" + item[worklist.key] + " data-imgNowKey="
		  + item[worklist.imgNowKey] + " data-locked=" + locked
		  + "></button>";
              buttonHTML = buttonHTML + "<button class='loc_WL_OPEN_SAS_QUICK'"
	          + "data-wl=" + worklist.id + "  data-imgNowKey="
		  + item[worklist.imgNowKey] + " data-route-id='loc_WL_OPEN_SAS"
	          + "_QUICK' type='button' data-key=" + item[worklist.key]
		  + " data-imgNowKey=" + item[worklist.imgNowKey]
		  + " data-locked=" + locked + "></button>";
          }
        }
      
      if (jwt.user.isApprover) {
          if(  worklist.id == "0" ){
          if (jwt.user.isIA ) {
         buttonHTML = "<button class='loc_WL_UNLOCK_APR_FULL' data-wl="
		+ worklist.id + "  data-imgNowKey="
		+ item[worklist.imgNowKey] + " data-route-id='loc_WL_UNLOCK_"
	        + "APR_FULL' type='button' data-key=" + item[worklist.key]
		+ " data-imgNowKey=" + item[worklist.imgNowKey]
		+ " data-locked=" + locked + "></button>";
          }
		buttonHTML = buttonHTML + "<button class='loc_WL_OPEN_APPROVER'"
		    + "data-wl=" + worklist.id + "  data-status="
		    + item["SHEET_STATUS"] + " data-imgNowKey="
		    + item[worklist.imgNowKey] + " data-route-id='loc_WL_OPEN"
		    + "_APPROVER' type='button' data-key=" + item[worklist.key]
		    + " data-imgNowKey=" + item[worklist.imgNowKey]
		    + " data-locked=" + locked + "></button>";

         buttonHTML = buttonHTML + "<button class='loc_WL_VIEW_APPROVER'"
	        + "data-wl=" + worklist.id + "  data-imgNowKey="
		+ item[worklist.imgNowKey] + " data-route-id='loc_WL_VIEW"
	        + "_APPROVER' type='button' data-key=" + item[worklist.key]
		+ " data-imgNowKey=" + item[worklist.imgNowKey]
		+ " data-locked=" + locked + "></button>";
     }else {
          if ( worklist.id == 2){
            buttonHTML = "<button class='loc_WL_OPEN_APPROVER'"
	        + "data-wl=" + worklist.id + "  data-imgNowKey="
		+ item[worklist.imgNowKey] + " data-route-id='loc_WL_OPEN"
	        + "_APPROVER' type='button' data-key=" + item[worklist.key]
		+ " data-imgNowKey=" + item[worklist.imgNowKey]
		+ " data-locked=" + locked + "></button>";           
          }else{

            buttonHTML = "<button class='loc_WL_VIEW_APPROVER'"
	        + "data-wl=" + worklist.id + "  data-imgNowKey="
		+ item[worklist.imgNowKey] + " data-route-id='loc_WL_VIEW"
	        + "_APPROVER' type='button' data-key=" + item[worklist.key]
		+ " data-imgNowKey=" + item[worklist.imgNowKey]
		+ " data-locked=" + locked + "></button>";
          }
          }
      }
       wlRow = wlRow + '<tr data-imgNowKey=' + item[worklist.imgNowKey]
	      + ' data-locked=' + locked + '  data-class=' + worklist.class
	      + ' data-key=' + item[worklist.key] + ' data-wl='
	      + worklist.id + ' ><td>' + buttonHTML + '</td>';
	  
        if (worklist.wlID == "1") {
            wlRow += "<td class='icon-td' >"
		+ ((important == "Y")
		   ?("<i class='fa fa-flag'></i><span style='visibi"
		     + "lity:hidden'>" + important + "</span>") : "")
		+ " </td>";
        }

       for (p in item) {
          if (rowtmplt.indexOf(p) != -1) {
              flag = p == 'INSTANCEID' && worklist.id == '0'
		  && important == 'Y' ? "Y" : "N";
              wlRow = wlRow + "<td data-has-flag='" + flag + "' class='ps-"
		  + p + "'>" + (item[p] == '' ? '-'
				: decodeURIComponent(item[p])) + '</td>';
          }
        }
        wlRow = wlRow + '</tr>';
      });  /* end each row returned from parse data */

      if (worklist.wlID == "1") {
          hdricon = "<th ><i class='fa fa-flag'></i></th>";
      }

      jQuery("<table   ><thead><tr><th>Unlock / View</th>" + hdricon +
          tblheader + "</tr></thead><tbody></tbody></table>")
        .attr('id', wlTableID)
        .addClass("table-condensed")
        .addClass(worklist.class)
        .appendTo("#" + worklist.wldivtab)
            .find("tbody").html(wlRow).end();
    }

    var addClickHandler = function(data, worklist) {
      var rows = jQuery("#wl-tbl-" + worklist.id + " tr[data-class^= 'wl']")
      _.each(rows, function(row) {
        jwt.routes.xx_bind_buttons(row)
      })
    }

    var initModule = function() {
      var wlArray = jwt.jwtWorkList.userWorkList,
        jqXHRoptions, promises = [];

      jQuery(".wlClose").on("click", function() {
        reset_Tabs();
      });

      jQuery.each(wlArray, function(index, worklist) {
        var def = new jQuery.Deferred();

          //Invoice admins not SAS get the full list of invoices
	  //SAS invoice admins will already have the full list from the SAS9
	  //view the differnce is the SAS IA will have edit privelages on
	  //all invoice from the SAS9 view
        var xlink, xqrystring
        if ( !jwt.user.isSAS && jwt.user.isIA && worklist.wlID == '1') {
           var qrystring = 'DATA_REQUEST[1]={"ViewName":"XX_289_WL_APRA"'
	          + ',"CoumnList":[]}'
          xlink = worklist.urlBase + worklist.iScript + qrystring;
        } else {
            xlink = worklist.urlBase + worklist.iScript +
		worklist.qrystring.replace("%USER%", jwt.user.operID);
        }

        jqXHRoptions = {
          type: "POST",
          url: xlink,
          contentType: "application/json"
        };
        jQuery.ajax(jqXHRoptions).done(
          //for each completion do this
          function(data, textStatus, jqXHR) {
            wlCreatTable(data, worklist)
          },
          function(data, textStatus, jqXHR) {

            addClickHandler(data, worklist)
          },
          function(data, textStatus, jqXHR) {
            def.resolve();
          });
        //keep track of the promises
        promises.push(def);
      });
      //when all are complete do this
      jQuery.when.apply(undefined, promises).promise().done(function() {

        var tabSelected = "",
            //the wl hash value may be passed on the url if the user is entering
	    //via homepage
          wlhash = jwt.functions.getHashValue("WL");
        //set up the search input for the first tab

          //removing the has will refresh the page so set the hash to 999 if
	  //not used
        if (wlhash != "999") {
          tabSelected = wlhash.toString();
          //work around limitations of the caller
          if (wlhash == 9) {
            tabSelected = "6"
          }
          if (wlhash == 7) {
            tabSelected = "2"
          }
        }
        jQuery("#work-lists table").tablesorter({
          headerTemplate: '{content} {icon}',
          widgets: ['columns', 'filter'],
          widgetOptions: {
            // include column filters
            filter_columnFilters: true,
            filter_saveFilters: true

          }
        })
          var elem = jQuery('#work-list-menu a[data-tab="' + tabSelected
			    + '"]').click();
        window.location.hash = "WL=999";

      });
    };

    return {

      init: initModule,
      wlCounts: wlCounts,
      wlRedFlg: wlRedFlg,
      reset_Tabs: reset_Tabs,
      sActivePage: sActivePage
    };

  }
  ());
