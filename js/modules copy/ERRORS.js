jwt.o = {};

jwt.o.ErrorStoreFunctions = (function() {
    return {
        init : function(){
        jQuery.extend(jwt.functions,
         {  getError: function(id) {
                return jwt.constants.ERRORS[id];
        }
    })

}}})();

jwt.o.ErrorStore =  [
        {
            id            : 'msg-isDirty',
            type          : "fa fa-check fa-3x",
            text          : 'Invoice is Dirty',
            test          : function(  ){
                            if ( jwt.isDirty ){
                                return true}
                            },
            field         : [  ] ,
            desc          : 'You have unsaved data on the page',
            pageEdit      : false,
            popUp         : true ,
            popUpFunction :
                            function( obj ){
                                 var continueFunction ;
                                 if ( typeof obj.route.serverFunction == "function"){
                                     continueFunction = obj.route.serverFunction;
                                 }else{
                                     continueFunction = function( continueFunction ) { jwt.jwtComponent.getData('jwt.jwtComponentConfigFull', null, this.form, continueFunction ) }
                                 }
                                 var that = this;
                                 var parms = {
                                  cancel: true,
                                  ok: true,
                                  message: "You have unsaved data on this page. Click OK to go back and save, or Cancel to continue.",
                                  loadTemplate: jwt.templates.loadPopUp,
                                  popCallback: function(elem) {
                                    if (jQuery(elem).hasClass('btn-cancel')) {
                                        continueFunction( that )
                                    }
                                  }
                                };
                                jwt.templates.loadTemplate(parms);
                            }

        },
        {
            id          : 'msg-isFDApprove',
            type        : "fa fa-check fa-3x",
            text        : 'Invoice is FD Approved',
            test        : function(  ){
                            if ( jwt.invoice.user.isFDApproved ){
                                return true}
                            },
            field       : [] ,
            desc        : 'required Field',
            pageEdit    : false,

        },
        {
            id          : 'msg-valFA-Reroute',
            type        : "fa fa-exclamation",
            text        : 'There must be a Finance approver on the approval chain',
            test        : function(  ){
                            if ( jwt.invoice.user.hasApproverOnChain ){
                                return false}else{
                                return true
                            }
                            },
            field       : [] ,
            desc        : 'required Field',
            pageEdit    : true,

        },
        {
            id          : 'msg-valFA-Approve',
            type        : "fa fa-exclamation",
            text        : 'You do not have financial autority to approve the invoice.  Please select an additional approver.',
            test        : function(  ){
                            //cant approve without a valid approver
                            if ( jwt.invoice.user.isAddedUserFinanceApprover ||
                                jwt.invoice.user.isANYUserFinanceApprover  ||
                                jwt.invoice.user.isPNDUserFinanceApprover ||
                                jwt.invoice.user.isPOInvoice )
                            {
                                false }else{
                             return true}
                            },
            field       : [] ,
            desc        : 'required Field',
            pageEdit    : true,
        },
        {
            id          : 'msg-valFA-Pass',
            type        : "fa fa-exclamation",
            text        : 'Invoice not financially approved.  Please select an additional approver',
            test        : function(  ){
                            //cant pass without a valid approver
                            if ( jwt.invoice.user.hasApproverOnChain ){

                                return false}else{
                                return true
                            }
                            },
            field       : [] ,
            desc        : 'required Field',
            pageEdit    : true
        },
        {
            id          : 'msg-val-approver-reroute',
            class       : 'W',
            type        : "fa fa-exclamation",
            text        : 'approver required for reroute',
            test        : function(  ){
                            //cant pass without a valid approver
                            jwt.functions.editApproverList();
                            if ( jwt.invoice.user.hasApproverOnChain ){
                                return false}else{
                                return true
                            }
                            },
            field       : [] ,
            desc        : 'required Field',
            pageEdit    : false
        },
        {
            id          : 'msg-requires-Comment-no-pop',
            type        : "fa fa-exclamation",
            text        : 'Comment Required',
            test        : function( val ){
                              return !val.value
                             },
            field       : [ "xx-comment-approver"  ] ,
            desc        : 'required Field',
            template    : "<ul> {{#list}}<li> <span>{{id}}</span><span>{{text}}</span></li>{{/list}}<ul>",
            pageEdit    : true

        },
        {
            id          : 'msg-requires-Comment',
            type        : "fa fa-exclamation",
            text        : 'Comment Required',
            test        : function( val ){
                                           return !val.value
                                         },
            field       : [ "xx-comment"  ] ,
            desc        : 'required Field',
            pageEdit    : true,
            popUp       : true,

            popUpFunction :     function( obj ){

                                var continueFunction;

                                /* the pop up works inside the *this* scope
                                   of the object that originated the click
                                   allowing the return click of the pop up
                                    to be directed based on propter / attributes of
                                    that  object.  this comes in most handy
                                    especially on the clicks off the tab worklists*/

                                var that = this;

                                if ( typeof obj.route.serverFunction == "function"){
                                    continueFunction = obj.route.serverFunction;
                                }else{
                                    continueFunction = function(  ) {
                                       if (jQuery("#user-pop-up #temp-comment").val() ){
                                          jQuery("#user-pop-up").hide();
                                          jQuery( "#XX_HDR_CT" ).val( jQuery("#user-pop-up #temp-comment").val());
                                          jQuery( that ).click();
                                        }
                                    }
                                }

                                var outHTML = jwt.Mustache.to_html(jwt.templates['COMMENT']);

                                 var parms = {
                                  cancel: true,
                                  ok: true,
                                  subTemplate : outHTML,
                                  userCancel : true,
                                  message:  " This action requires a comment" ,
                                  loadTemplate: jwt.templates.loadPopUp,
                                  popCallback: function(elem) {
                                    if (jQuery(elem).hasClass('btn-ok')) {
                                        continueFunction()
                                    }else{
                                        jQuery("#user-pop-up").hide();
                                    }
                                  }
                                };

                                jwt.templates.loadTemplate(parms);
                            } /*end pop up function */

        },

            {
                id         : 'msg-req-001',
                class      : 'W',
                type       : "fa fa-exclamation",
                text       : 'Field Required ',
                test       : function( val ){
                             return !val.value || val.value == "0.00"  || val.value == "0"
                              },
                field      : [ "rf-hdr-bu" , "qf-hdr-bu" , "qf-hdr-in" , "qf-hdr-id"  , "qf-hdr-ga" ,"rf-hdr-in" , "rf-hdr-id"  , "rf-hdr-ga" ] ,
                desc       : 'required Field',
                pageEdit   : true,

            },
            {
                id: 'msg-val-in-001',
                class: 'W',
                type: "fa fa-exclamation",
                text: 'Invalid Invoice Number',
                test : function( val ){
                    var regx = /^[A-Za-z0-9 ]+$/;
                    if (jQuery(  val ).val()) {
                      if (  !regx.test(jQuery(val).val())){
                          jwt.constants.ERRORS['msg-val-in-001'].desc = "Invalid value " + val.value
                          val.value ="";
                          return val;
                      }
                      }
                    },
                field: [ "qf-hdr-in" , "rf-hdr-in"  ] ,
                desc: "Page Error above field",
                pageEdit: true,


            },
            {
                id        : 'msg-val-id-001',
                class     : 'W',
                type      : "fa fa-exclamation",
                text      : 'Invalid Invoice Data',
                test      : function( val ){
                            if(  moment(val.value).isAfter(moment()) ){
                              jwt.constants.ERRORS['msg-val-id-001'].desc = val.value + " Date greater than  " + moment().format()
                              val.value ="";
                              return val;
                              }
                             },
                field     : [ "qf-hdr-id"  , "rf-hdr-id"] ,
                desc      : "Page Error above field",
                pageEdit  : true
            },
            {
                id        : 'msg-val-numbers',
                class     : 'W',
                type      : "fa fa-exclamation",
                text      : 'Invalid Number',
                test      : function( val ){
                              if ( ! jQuery.isNumeric( val.value.replace(/,/g,'') ) ) {
                              jwt.constants.ERRORS['msg-val-numbers'].desc = "Invalid Number  " + val.value
                              val.value =0;
                              return val;}
                              },
                field     : [ "qf-hdr-ga" ,"qf-hdr-st" ,"rf-hdr-ga" ,"rf-hdr-st"  ] ,
                desc      : "Page Error above field",
                pageEdit  : true,
            },
            {
                id: 'msg-list-error',
                class: 'ps-hidden',
                type: "fa fa-exclamation-triangle",
                text: 'Message Text',
                desc: 'Detailed message info'
            },
    // Add server errors in the section below
    // Server errors are marked with context of "S"

            {
                id: 'msg-023',
                class: 'W',
                type: "fa fa-exclamation",
                text: 'Invoice header PO exception found',
                desc: 'Invoice header PO exception found',
                context : ["S"]
            },
            {
                id: 'msg-018',
                class: 'W',
                type: "fa fa-exclamation",
                text: 'Project must have a status of OOP or Open',
                desc: 'Project must have a status of OOP or Open',
                context : ["S"]
            },
            {
                id: 'msg-017',
                class: 'W',
                type: "fa fa-exclamation",
                text: 'Project number is not valid ',
                desc: 'Project number is not valid ',
                context : ["S"]
            },
           {
                id: 'msg-015',
                class: 'W',
                type: "fa fa-exclamation",
                text: 'PO must have a status of Dispatched',
                desc: 'PO must have a status of Dispatched',
                context : ["S"]
            },

            {
                id: 'msg-016',
                class: 'W',
                type: "fa fa-exclamation",
                text: 'PO date must be before the invoice date',
                desc: 'PO date must be before the invoice date',
                context : ["S"]
            },

            {
                id: 'msg-012',
                class: 'W',
                type: "fa fa-exclamation",
                text: 'Approver is out of office',
                desc: 'Approver is out of office. Are you sure you want to route the invoice?',
                context : ["S"]
            },
            {
                id: 'msg-dup-003',
                class: 'W',
                type: "fa fa-exclamation",
                text: 'Duplicate invoice detected ',
                field: "rf-hdr-in",
                desc: 'The system found a duplicate',
                context : ["S"]
            },
            {
                id: 'msg-019-a',
                class: 'W',
                type: "fa fa-exclamation-triangle",
                text: 'Invoice line not fully coded',
                desc: 'Detailed message info',
                context : ["S"]
            },

            {
                id: 'msg-010',
                class: 'W',
                type: "fa fa-arrow-right fa-3x",
                text: 'Vendor location is inactive',
                context : ["S"]
            },
            {
                id: 'msg-008',
                class: 'W',
                type: "fa fa-exclamation-triangle",
                text: 'Vendor location is on Payment hold',
                desc: 'Detailed message info',
                context : ["S"]
            },
            {
                id: 'msg-list-return-SAS',
                class: 'W',
                type: "fa fa-arrow-right fa-3x",
                text: 'Invoice will be returned to SAS',
                context : ["S"]

            },
            {
                id: 'msg-ut-001',
                class: 'W',
                type: "fa fa-exclamation-triangle",
                text: 'Use Tax will be accrued',
                desc: 'Detailed message info',
                context : ["S"]
            },
            {
                id: 'msg-022',
                class: 'ps-hidden',
                type: "fa fa-exclamation-triangle",
                text: 'Invoice lines PO exception found',
                desc: 'Invoice lines PO exception found'
            },
            {
                id: 'msg-002',
                class: 'W',
                type: "fa fa-exclamation-triangle",
                text: 'Message Text',
                desc: 'Detailed message info'
            },
            {
                id: 'msg-013',
                class: 'W',
                type: "fa fa-check",
                text: 'Vendor PO Mapping error found',
                desc: 'You must select a PO with the same vendor ID',
                context : ["S"]
            },
            {
                id: 'msg-hst-001',
                class: 'W',
                type: "fa fa-check",
                text: 'Invoice Header Ship to required for route',
                desc: 'Please add a ship to before routing',
                field: [ "rf-hdr-so"],
                context : ["S"]
            }
            ,
            {
                id: 'msg-004',
                class: 'W',
                type: "fa fa-exclamation-triangle",
                text: 'Message Text',
                desc: 'Detailed message info'
            }
            ,
            {
                id: 'msg-005',
                class: 'W',
                type: "fa fa-exclamation-triangle",
                text: 'Message Text',
                desc: 'Detailed message info',
                context : ["S"]
            }
            ,
            {
                id: 'msg-007',
                class: 'W',
                type: "fa fa-exclamation-triangle",
                text: 'Vendor Not Active!',
                field: ['rf-hdr-vi'],
                desc: 'An active vendor will be requried for route',
                context : ["S"]
            }
            ,
            {
                id: 'msg-009',
                type: "fa fa-exclamation-triangle",
                text: 'Vendor Location required for route.',
                field: 'rf-hdr-vi',
                desc: 'Please Select a vendor location',
                context : ["S"]
            }
            ,
            {
                id: 'msg-006',
                type: "fa fa-exclamation-triangle",
                text: 'Vendor Required for Route!',
                field: ['rf-hdr-vi'],
                desc: '',
                context : ["S"]
            }
            ,
            {
                id: 'msg-fa-001',
                class: 'W',
                type: "fa fa-check fa-3x",
                text: 'Invoice Financially approved!',
                desc: 'A valid first approver required for route',
                context : ["S"]
            }

            ,
            {
                id: 'msg-st-001',
                text: 'Sales Tax entered is more than the calculated amount',
                desc: 'Sales Tax entered is more than the calculated amount',
                context : ["S"]
            }


            ,
            {
                id: 'msg-024',
                text: 'You may approve PO only invoice!',
                desc: 'You may approve PO only invoice',
                context : ["S"]
            }
            ,
            {
                id: 'msg-011',
                type: "fa fa-exclamation-triangle",
                text: 'First Approver Not Active!',
                field: [ 'rf-hdr-fa'],
                desc: 'A valid first approver required for route',
                context : ["S"]
            }
            ,
            {
                id: 'msg-list-return-fd',
                type: "fa fa-exclamation-triangle",
                text: 'Invoice will be routed to FD for approval',
                desc: 'Detailed message info',
                context : ["S"]
            },
            {
                id: 'msg-014',
                type: "fa fa-exclamation-triangle",
                text: 'PO number is not valid ',
                desc: 'PO number is not valid ',
                context : ["S"]

            },
            {
                id: 'msg-020',
                type: "fa fa-exclamation-triangle",
                text: 'Line Total errors',
                desc: 'Detailed message info',
                context : ["S"]

            },
            {
                id: '000-000',
                type: "fa fa-exclamation-triangle",
                text: 'Message Text',
                desc: 'Detailed message info'

            }
        ]

jwt.constants.ERRORS = {};
(function () {
    for (i = 0; i < jwt.o.ErrorStore.length; i++) {
        jwt.constants.ERRORS[ jwt.o.ErrorStore[i].id ] = jwt.o.ErrorStore[i];
    }
})()
