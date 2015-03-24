jwt.jwtComponentConfigApprove = (function() {
  return {
    Definition    : 'jwtComponentConfigApprove',
    init          : function() {
                              jQuery(jwt.jwtModalApprove.modalHTML).appendTo("body")
                              },
    loadTemplate  : jwt.templates.loadApproveTemplate,
    modal         : "#approve-dialog",
    formAction    : '../../../EMPLOYEE/ERP/c/XX_AP_CUSTOM_MENU.XX_FCM289_APPR.GBL',
    editArray     : [ "msg-requires-Comment" ],
    conroller     : function(elem) {},
    callback      : function(config) {
                      //initialize
                      jwt.invoice.isAddedUserFinanceApprover = false;
                      jwt.invoice.user.hasApproverOnChain = false;
                      jwt.invoice.user.approverList = [];


                      //build the select2 drop of approvers
                      var $obj = jQuery("#loc_S2_APPROVER");
                      var tblName = $obj.data('ps-tbl-name');
                      var config = jwt.jwtData.Configs[tblName];
                      if (config.hasOwnProperty($obj.attr('id'))) {
                        var funName = $obj.attr('id');
                        config[funName]($obj);
                      }

                      jwt.jwtData.Configs['XX_APPROVERS'].lunr_index = null;

                      jwt.jwtData.create_Lunr_search( jwt.jwtData.Configs['XX_APPROVERS'] )
                    //go through the list of approvers and determine if they can approve
                      _.each( jwt.jwtData['XX_APPROVERS'] , function(obj) {
                          if( jwt.invoice.user.validApprovers.indexOf( obj.OPRID ) > 0 ) {
                              //var field = {};
                              obj.canApprove = "Y"
                          }else{
                          //obj.canApprove = "N";
                          }
                          jwt.jwtData.add_fields_lunr_search(  jwt.jwtData.Configs['XX_APPROVERS'] , obj)
                          })

                      //handle remove clicks to take user of the chain
                      jQuery(document).off('click', '.remove-approver').on('click', '.remove-approver', function() {
                        jQuery(this).parent().parent().remove();
                        jwt.functions.editApproverList();
                      });

                      jQuery("#APPROVER_ADD_LIST").sortable({
                        placeholder: "ui-state-highlight"
                      });

                    }
                  }
})();
