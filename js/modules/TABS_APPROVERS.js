jwt.jwtWorkListConfig_APR = (function() {

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
    class: 'wl-appr',
    wldivtab: 'work-lists',
    sweepWebLib: '/EMPLOYEE/ERP/s/WEBLIB_XX_NAV.'
                   + 'WEBLIB_FUNCTION.FieldFormula.iScript_xxSweepImageNow',
    imgNowKey: 'XX_IMAGENOW_DOC_ID',
    iScript: '/EMPLOYEE/ERP/s/WEBLIB_XX_MJSON.ISCRIPT1.'
               + 'FieldFormula.iScript_xxGet_Json_Data?',
    urlBase: "http://" + location.host + "/psc/" + url_jwt[4],
    imgNowURL: 'http://nyc0psfs07.na.corp.jwt.com:8080/webnow'
                +  '/index.jsp?action=document&docid=' ,
  };

  var UserWorkList = [{
      name: 'Search',
      wlLockField: 'NAME',
      wlID: '1',
      qrystring: 'DATA_REQUEST[1]={"ViewName":"XX_289_WL_APRA","CoumnList"'
          + ':[{"Column_Name":"OPRID","Column_Value": "%USER%"'
          + ',"Operator":"="}]}',
      fldlist: [{
        fname: 'INSTANCEID',
        fdescr: 'ID'
      }, {
        fname: 'XX_DTTM_CHAR',
        fdescr: 'Date Time Received'
      }, {
        fname: 'INVOICE_ID',
        fdescr: 'Invoice'
      }, {
        fname: 'XX_INV_DATE_CHAR',
        fdescr: 'Invoice Date'
      }, {
        fname: 'VENDOR_NAME',
        fdescr: 'Vendor'
      }, {
        fname: 'PROJECT_TYPE',
        fdescr: 'Proj Type'
      }, {
        fname: 'AMOUNT',
        fdescr: 'Amount'
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
      name: 'In Process',
      wlLockField: '',
      wlID: '1',
      qrystring: 'DATA_REQUEST[1]={"ViewName":"XX_289_WL_APR2","CoumnList"'
	    + ':[{"Column_Name":"OPRID","Column_Value": "%USER%","'
	    + 'Operator":"="}]}',
      fldlist: [{
        fname: 'INSTANCEID',
        fdescr: 'ID'
      }, {
        fname: 'XX_WL_DESCR',
        fdescr: 'Save Reason'
      }, {
        fname: 'INVOICE_ID',
        fdescr: 'Invoice Number'
      }, {
        fname: 'XX_DTTM_RECV_CHAR',
        fdescr: 'Date/Time Received'
      }, {
        fname: 'XX_DTTM_ROUTE_CHAR',
        fdescr: 'Date Routed'
      }, {
        fname: 'XX_CUST_NAME_LONG',
        fdescr: 'Customer'
      }, {
        fname: 'VENDOR_NAME',
        fdescr: 'Vendor Name'
      }, {
        fname: 'AMOUNT',
        fdescr: 'Invoice Amount'
      }, {
        fname: 'XX_REVIEW_DESCR',
        fdescr: 'Review'
      }]
    },

    {
      name: 'To Approve',
      wlLockField: '',
      wlID: '2',
      qrystring:   'DATA_REQUEST[1]={"ViewName":"XX_289_WL_APR1",'
	         + '"CoumnList":[{"Column_Name":"OPRID","Column_Value"'
	         +  ':"%USER%","Operator":"="}]}',
      fldlist: [{
        fname: 'INSTANCEID',
        fdescr: 'ID'
      }, {
        fname: 'XX_WL_DESCR',
        fdescr: 'Save Reason'
      }, {
        fname: 'INVOICE_ID',
        fdescr: 'Invoice Number'
      }, {
        fname: 'XX_DTTM_RECV_CHAR',
        fdescr: 'Date/Time Received'
      }, {
        fname: 'XX_DTTM_ROUTE_CHAR',
        fdescr: 'Date Routed'
      }, {
        fname: 'XX_CUST_NAME_LONG',
        fdescr: 'Customer'
      }, {
        fname: 'VENDOR_NAME',
        fdescr: 'Vendor Name'
      }, {
        fname: 'AMOUNT',
        fdescr: 'Invoice Amount'
      }, {
        fname: 'XX_REVIEW_DESCR',
        fdescr: 'Review'
      }]
    }, {
      name: 'Invoices Sent Back',
      wlLockField: '',
      wlID: '3',
      qrystring: 'DATA_REQUEST[1]={"ViewName":"XX_289_WL_APR3"'
	    + ',"CoumnList":[{"Column_Name":"OPRID","Column_Value"'
	    + ':"%USER%","Operator":"="}]}',
      fldlist: [{
          fname: 'INSTANCEID',
          fdescr: 'ID'
        }, {
          fname: 'XX_WL_DESCR',
          fdescr: 'Worklist'
        }, {
          fname: 'INVOICE_ID',
          fdescr: 'Invoice Number'
        }, {
          fname: 'XX_DTTM_RECV_CHAR',
          fdescr: 'Date/Time Received'
        }, {
          fname: 'XX_DTTM_ROUTE_CHAR',
          fdescr: 'Date Routed'
        }, {
          fname: 'XX_CUST_NAME_LONG',
          fdescr: 'Customer'
        }, {
          fname: 'VENDOR_NAME',
          fdescr: 'Vendor Name'
        }, {
          fname: 'AMOUNT',
          fdescr: 'Invoice Amount'
        }, {
          fname: 'XX_REVIEW_DESCR',
          fdescr: 'Review'
        }

      ]
    }
  ];


  var init = (function() {
    for (var i = 0; i < 4; i++) {
      UserWorkListNew[i] = new WorkList(i, UserWorkListBase, UserWorkList[i]);
    }
  })();

  return {
    userWorkList: UserWorkListNew
  };

}());
