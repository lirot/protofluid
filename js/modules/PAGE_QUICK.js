jwt.jwtComponentConfigQuick = (function() {
  return {

    Definition: 'jwtComponentConfigQuick',
    url: ['/EMPLOYEE/ERP/c/XX_AP_CUSTOM_MENU.XX_FCM289_APPR.GBL?INSTANCEID='],
      //url2: ['/EMPLOYEE/ERP/s/WEBLIB_XX_NAV.WEBLIB_FUNCTION.FieldFormula'
      //.iScript_xxViewRPayInvoice?INSTANCEID='],
    loadTemplate: jwt.templates.loadQuickTemplate,
    templateName: 'QuickTemplate',
    init: function() {},
    filterString: "input[id], a[name], div [id^='XX'], textarea, .ps-page-info",
    lineString: "input[id^='XX_LIN_LN']",
    headerMatch: "XX_HDR",
    lineMatch: /\d+/g,
    saveMethods: "",
    formAction: '/EMPLOYEE/ERP/c/XX_AP_CUSTOM_MENU.XX_FCM289_APPR.GBL',
      editArray: ["msg-req-001", "msg-val-in-001",
		  "msg-val-id-001", "msg-val-numbers"],
    controller: function(elem) {

//commented code was used for locking worklist items over a socket io call with\// a node js listener and custom messaging code.  in an effort to reduce overall
// complexity combined with the the additional calls to refreshing the worklist
	// the code for the socket io realtime locking has been removed.
	//var tempclickObject = jwt.jwtComponentConfigQuick.workListObject;
	//tempclickObject.command = "MOVE";
	//if (typeof jwt.Chat.processWorkListClick === 'function') {
	//jwt.Chat.processWorkListClick(tempclickObject);
        //}else{ console.log('Warning - Node Server not available')}

      (jQuery('.NL-check').val()) ? jQuery('#XX_HDR_VL').val(""): null;
      console.log("run you!")

    },

    callback: function(config) {

      jwt.functions.createS2_header();
      jQuery('#XX_HDR_ID').datepicker().change(function() {
        jQuery(this).val(jwt.functions.getDateFormatted(jQuery(this).val()));
      });
      jwt.functions.setupNLCheck(jwt.functions.setupNLCheck);

      jQuery('#XX_HDR_GA, #XX_HDR_ST').on('change', function(event) {
        jwt.functions.formatNumbersQF()
      });

      jwt.routes.xx_bind_buttons();
    }
  }

})();
