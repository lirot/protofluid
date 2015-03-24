jwt.constants = {};
jwt.constants.keysIndex =
 [
    {key : "TBV" , value : "To Be Vouchered"},
    {key : "IMG" , value : "Image Now"},
    {key : "TBP" , value : "To Be Processed"},
    {key : "INV" , value : "Invalid Vendor"},
    {key : "PEN" , value : "Pending"},
    {key : "UTX" , value : "Use Tax Review"},
    {key : "NEW" , value : "To Enter"},
    {key : "SUB" , value : "Submitted"},
    {key : "VCH" , value : "Vouchered"},
    {key : "DEN" , value : "Denied"},
    {key : "M"   , value : "Approved"},
    {key : "P"   , value : "Pending"},
    {key : "D"   , value : "Denied"},
    {key : "I"   , value : "Passed"},
    {key : "F"   , value : "Removed!"},
    {key : "N"   , value : "Not Routed"}

];
jwt.constants.keys = {};
(function () {
    for (i = 0; i < jwt.constants.keysIndex.length; i++) {
        jwt.constants.keys[ jwt.constants.keysIndex[i].key ] = jwt.constants.keysIndex[i].value;
    }
})()
jwt.constants.datepickerDefaults =
{
      showOn: "button",
      buttonImage: "images/calendar.gif",
      buttonImageOnly: true,
      buttonText: "Select date"
    }

jwt.constants.imgNowURL = "http://nyc0psfs07.na.corp.jwt.com:8080/webnow/index.jsp?action=document&docid="

jwt.fields = {};
jwt.fields['rf_hdr_bu'] = (function() {
  return {
    Definition     :  "rf_hdr_bu",
//    canViewFunc    :  function(){  return !!jwt.invoice.header.XX_HDR_SO},
    canEditFunc    :  function(){  return jwt.invoice.lineNumberAdd > 0 && !! jwt.invoice.sections[0].lines[0].XX_LIN_PO },

  }
})();
jwt.fields['add'] = (function() {
  return {
    Definition     :  "remove-add",
    canViewFunc    :  function(){  return jwt.invoice.header.XX_HDR_SS == "DEN"},
    canEditFunc    :  function(){  return jwt.invoice.lineNumberAdd > 0 && !! jwt.invoice.sections[0].lines[0].XX_LIN_PO },

  }
})();
jwt.constants.FIELDS = {};
