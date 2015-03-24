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
