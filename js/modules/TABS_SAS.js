jwt.jwtWorkListConfig_SAS = (function() {
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
  var WorkList = function(i, obj1, obj2) {
    this.id = i;
    for (var attrname in obj1) {
      this[attrname] = obj1[attrname];
    }
    for (var attrname in obj2) {
      this[attrname] = obj2[attrname];
    }
  };

  var UserWorkListNew = [];
  var wlCounts = {};
  var url_jwt = document.URL.replace(/\/\s*$/, '').split('/');
  var UserWorkListBase = {
    key: 'INSTANCEID',
    type: 'wl',
    class: 'wl-sas',
    wldivtab: 'work-lists',
    sweepWebLib: '/EMPLOYEE/ERP/s/WEBLIB_XX_NAV.WEBLIB_FUNCTION.FieldFormula'
	           + '.iScript_xxSweepImageNow',
    imgNowKey: 'XX_IMAGENOW_DOC_ID',
    iScript: '/EMPLOYEE/ERP/s/WEBLIB_XX_MJSON.ISCRIPT1.FieldFormula.'
               + 'iScript_xxGet_Json_Data?',
    urlBase: "http://" + location.host + "/psc/" + url_jwt[4],
    imgNowURL: "http://nyc0psfs07.na.corp.jwt.com:8080/webnow/index."
                 + "jsp?action=document&docid=",
  };

  var UserWorkList = [{
      name: 'Search',
      wlLockField: 'NAME',
      wlID: '1',
      qrystring: 'DATA_REQUEST[1]={"ViewName":"XX_289_WL_SAS9","CoumnList"'
                 + ':[]}',
      fldlist: [{
        fname: 'INSTANCEID',
        fdescr: 'ID'
      }, {
        fname: 'XX_DTTM_CHAR',
        fdescr: 'Date Time Received'
      }, {
        fname: 'XX_FLAG',
        fdescr: ''
      }, {
        fname: 'INVOICE_ID',
        fdescr: 'Invoice Number'
      }, {
        fname: 'XX_INV_DATE_CHAR',
        fdescr: 'Invoice Date'
      }, {
        fname: 'VENDOR_NAME',
        fdescr: 'Vendor'
      }, {
        fname: 'PROJECT_TYPE',
        fdescr: 'Project Type'
      }, {
        fname: 'AMOUNT',
        fdescr: 'Invoice Amount'
      }, {
        fname: 'NAME',
        fdescr: 'Worked by'
      }, {
        fname: 'XX_DTTM2_CHAR',
        fdescr: 'Date Last'
      }, {
        fname: 'SHEET_STATUS',
        fdescr: 'Status'
      }]
    }, {
      name: 'Enter',
      wlLockField: 'NAME',
      wlID: '2',
      qrystring: 'DATA_REQUEST[1]={"ViewName":"XX_289_WL_SAS1","CoumnList":[]}',
      fldlist: [{
        fname: 'INSTANCEID',
        fdescr: 'ID'
      }, {
        fname: 'XX_DTTM_CHAR',
        fdescr: 'Date Time Received'
      }, {
        fname: 'GROUP_ID',
        fdescr: 'BU'
      }, {
        fname: 'EMAIL_FROM',
        fdescr: 'From'
      }, {
        fname: 'NAME',
        fdescr: 'Worked by'
      }, {
        fname: 'XX_TIME_DURATION',
        fdescr: 'Duration'
      }]
    }, {
      name: 'Process',
      wlLockField: 'NAME',
      wlID: '3',
      qrystring: 'DATA_REQUEST[1]={"ViewName":"XX_289_WL_SAS2","CoumnList":[]}',
      fldlist: [{
        fname: 'INSTANCEID',
        fdescr: 'ID'
      }, {
        fname: 'XX_DTTM_CHAR',
        fdescr: 'Date Time Received'
      }, {
        fname: 'GROUP_ID',
        fdescr: ' BU'
      }, {
        fname: 'INVOICE_ID',
        fdescr: 'Invoice Number'
      }, {
        fname: 'XX_INV_DATE_CHAR',
        fdescr: 'Invoice Date'
      }, {
        fname: 'PO_ID',
        fdescr: 'PO Number'
      }, {
        fname: 'VENDOR_ID',
        fdescr: 'Vendor ID'
      }, {
        fname: 'VENDOR_NAME',
        fdescr: 'Vendor Name'
      }, {
        fname: 'AMOUNT',
        fdescr: 'Invoice Amount'
      }, {
        fname: 'NAME',
        fdescr: 'Worked by'
      }, {
        fname: 'XX_TIME_DURATION',
        fdescr: 'Duration'
      }]
    }, {
      name: 'Vendor',
      wlLockField: 'NAME',
      wlID: '4',
      qrystring: 'DATA_REQUEST[1]={"ViewName":"XX_289_WL_SAS3","CoumnList":[]}',
      fldlist: [{
        fname: 'INSTANCEID',
        fdescr: 'ID'
      }, {
        fname: 'XX_DTTM_CHAR',
        fdescr: 'Date Time Received'
      }, {
        fname: 'INVOICE_ID',
        fdescr: 'Invoice Number'
      }, {
        fname: 'XX_INV_DATE_CHAR',
        fdescr: 'Invoice Date'
      }, {
        fname: 'PO_ID',
        fdescr: 'PO Number'
      }, {
        fname: 'VENDOR_ID',
        fdescr: 'Vendor ID'
      }, {
        fname: 'AMOUNT',
        fdescr: 'Invoice Amount'
      }, {
        fname: 'NAME',
        fdescr: 'Worked by'
      }, {
        fname: 'XX_TIME_DURATION',
        fdescr: 'Duration'
      }]
    }, {
      name: 'Use Tax',
      wlLockField: 'NAME',
      wlID: '5',
      qrystring: 'DATA_REQUEST[1]={"ViewName":"XX_289_WL_SAS6","CoumnList":[]}',
      fldlist: [{
        fname: 'INSTANCEID',
        fdescr: 'ID'
      }, {
        fname: 'XX_DTTM_CHAR',
        fdescr: 'Date Time Received'
      }, {
        fname: 'INVOICE_ID',
        fdescr: 'Invoice Number'
      }, {
        fname: 'XX_INV_DATE_CHAR',
        fdescr: 'Invoice Date'
      }, {
        fname: 'PO_ID',
        fdescr: 'PO Number'
      }, {
        fname: 'VENDOR_ID',
        fdescr: 'Vendor ID'
      }, {
        fname: 'AMOUNT',
        fdescr: 'Invoice Amount'
      }, {
        fname: 'NAME',
        fdescr: 'Worked by'
      }, {
        fname: 'XX_TIME_DURATION',
        fdescr: 'Duration'
      }]
    }, {
      name: 'Pending',
      wlLockField: 'NAME',
      wlID: '6',
      qrystring: 'DATA_REQUEST[1]={"ViewName":"XX_289_WL_SAS4","CoumnList":[]}',
      fldlist: [{
        fname: 'INSTANCEID',
        fdescr: 'ID'
      }, {
        fname: 'XX_DTTM_CHAR',
        fdescr: 'Date Time Received'
      }, {
        fname: 'INVOICE_ID',
        fdescr: 'Invoice Number'
      }, {
        fname: 'XX_INV_DATE_CHAR',
        fdescr: 'Invoice Date'
      }, {
        fname: 'VENDOR_ID',
        fdescr: 'Vendor ID'
      }, {
        fname: 'AMOUNT',
        fdescr: 'Invoice Amount'
      }, {
        fname: 'NAME',
        fdescr: 'Worked by'
      }, {
        fname: 'XX_TIME_DURATION',
        fdescr: 'Duration'
      }]
    }, {
      name: 'Review',
      wlLockField: 'NAME',
      wlID: '7',
      qrystring: 'DATA_REQUEST[1]={"ViewName":"XX_289_WL_SAS7","CoumnList":[]}',
      fldlist: [{
        fname: 'INSTANCEID',
        fdescr: 'ID'
      }, {
        fname: 'XX_DTTM_CHAR',
        fdescr: 'Date Time Received'
      }, {
        fname: 'BUSINESS_UNIT',
        fdescr: 'BU'
      }, {
        fname: 'PROJECT_TYPE',
        fdescr: 'Project Type'
      }, {
        fname: 'INVOICE_ID',
        fdescr: 'Invoice Number'
      }, {
        fname: 'XX_INV_DATE_CHAR',
        fdescr: 'Invoice Date'
      }, {
        fname: 'VENDOR_ID',
        fdescr: 'Vendor ID'
      }, {
        fname: 'AMOUNT',
        fdescr: 'Invoice Amount'
      }, {
        fname: 'NAME',
        fdescr: 'Worked by'
      }, {
        fname: 'XX_TIME_DURATION',
        fdescr: 'Duration'
      }, {
        fname: 'USER1',
        fdescr: 'W'
      }, {
        fname: 'USER2',
        fdescr: 'U'
      }, {
        fname: 'USER3',
        fdescr: 'FA'
      }, {
        fname: 'USER5',
        fdescr: 'I'
      }, {
        fname: 'USER6',
        fdescr: '$'
      }, {
        fname: 'USER7',
        fdescr: 'R'
      }, {
        fname: 'USER8',
        fdescr: 'B'
      }, {
        fname: 'USER9',
        fdescr: 'PO'
      }, {
        fname: 'COMMENT1',
        fdescr: 'Comment'
      }]
    }

  ];

  var init = (function() {

    for (var i = 0; i < 7; i++) {
      UserWorkListNew[i] = new WorkList(i, UserWorkListBase, UserWorkList[i]);
    }

      var tourl = "http://" + location.host + "/psc/" + url_jwt[4]
	  + '/EMPLOYEE/ERP/s/WEBLIB_XX_NAV.WEBLIB_FUNCTION.'
          + 'FieldFormula.iScript_xxSweepImageNow';
    var jqXHRoptions2 = {
      type: "POST",
      url: tourl,
      contentType: "application/json; charset=utf-8"
    };
    //var that = this;
    jQuery.ajax(jqXHRoptions2);

  })();


  return {
    userWorkList: UserWorkListNew
  };

}());
