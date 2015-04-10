jwt.routes['loc_WL_OPEN_SAS_FULL'] = (function() {
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 return {
     //for page buttons this flag will force the page to run the error array
     //configured on the page object
    runPageEdit    : false,
    //refresh tells the route processor to run the worklist refresh routine
    runRefresh     : true,
    //this flag will bring in a new image now document
    updateImageNow : true,
    Definition     : 'Click to view a new invoice',
    showProcess    : true,
    Description    : "Open Invoice Button",
     //these edits will run on the click stopping the user in cases
     //were the edit fails
    editArray      : ["msg-isDirty"],
     // the user can code this method to process on a pass of the
     // edit routine and before the ajax call
    beforeFunction : function(data) {},
    //this si the server call when the system passes the edit routine
    serverFunction : function(elem){
        jwt.jwtComponent.getData('jwt.jwtComponentConfigFull'
				 , jQuery(elem).data("key") + "&UNLOCK=Y" );
                        },
    afterFunction  : function() {
                        },
    //the system will hide the button if the function returns false
    canViewFunc    :  function(){  return !jwt.invoice.user.isLocked },
    //styling for the button
    buttonDefn     : { buttonClass : "sun-flower-button", buttonLabel    : "Open" }
  }
})();
jwt.routes['loc_WL_UNLOCK_SAS_FULL'] = (function() {
  return {
    runPageEdit    : false,
    runRefresh     : true,
    updateImageNow : true,
    showProcess    : true,
    Definition     : 'Click to unlock an invoice',
    Description    : "Unlock Invoice Button",
    editArray      : ["msg-isDirty"],
    beforeFunction : function(data) {},
    serverFunction : function(elem){
                       window.unlock = true;
        jwt.jwtComponent.getData('jwt.jwtComponentConfigFull'
				 , jQuery(elem).data("key") );
                        },
    afterFunction  : function() {    },
    canViewFunc    :  function(){  return !jwt.invoice.user.isLocked },
      buttonDefn     : { buttonClass : "sun-flower-button", buttonLabel
			 : "Unlock" }
  }
})();

jwt.routes['loc_WL_UNLOCK_SAS_QUICK'] = (function() {
  return {
    runPageEdit    : false,
    runRefresh     : true,
    updateImageNow : true,
    showProcess    : true,
    Definition     : '',
    Description    : "Unlock Quick Invoice Button",
    editArray      : ["msg-isDirty"],
    beforeFunction : function(data) {},
    serverFunction : function( id ){

                        if ( typeof id == "object"){
                            id = jQuery( id ).data("key");
                        }
                        if ( typeof id == "undefined"){
                            id = jwt.activeRouteContinuationID
                        }

                        window.unlock = true;

              var pageConfig =
              jwt.jwtComponent.getData('jwt.jwtComponentConfigQuick', id  );
                      },

    afterFunction  : function() {},
    canViewFunc    :  function(){  return !jwt.invoice.user.isLocked },
      buttonDefn     : { buttonClass : "alizarin-flat-button"
			 , buttonLabel    : "Unlock" }

  }
})();

jwt.routes['loc_WL_OPEN_SAS_QUICK'] = (function() {
  return {
    runPageEdit    : false,
    runRefresh     : true,
    updateImageNow : true,
    showProcess    : true,
    Definition     : '',
    Description    : "Open Quick Invoice Button",
    editArray      : ["msg-isDirty"],
    beforeFunction : function(data) {},
    serverFunction : function( id ){
                        if ( typeof id == "object"){
                            id = jQuery( id ).data("key");
                        }
                        if ( typeof id == "undefined"){
                            id = jwt.activeRouteContinuationID
                        }

        jwt.jwtComponent.getData(
	    'jwt.jwtComponentConfigQuick', id + "&UNLOCK=Y" );
                     },

    afterFunction  : function() {},
    canViewFunc    :  function(){  return !jwt.invoice.user.isLocked },
      buttonDefn     : { buttonClass
			 : "sun-flower-button", buttonLabel    : "Open" }
  }
})();

jwt.routes['loc_WL_VIEW_SAS_FULL'] = (function() {
  return {
    runPageEdit    : false,
    runRefresh     : true,
    Definition     : '',
    updateImageNow : true,
    Description    : "View Invoice Button",
    editArray      : ["msg-isDirty"],
    beforeFunction : function(data) {},
    serverFunction : function(elem){
                            window.view = true;
        jwt.jwtComponent.getData(
	    'jwt.jwtComponentConfigFull', jQuery(elem).data("key")
		+ "&UNLOCK=N");
                        },
    afterFunction  : function() {},
    canViewFunc    :  function(){  return !jwt.invoice.user.isLocked },
      buttonDefn     : { buttonClass : "alizarin-flat-button"
			 , buttonLabel    : "View" }
  }
})();

jwt.routes['loc_WL_OPEN_APPROVER'] = (function() {
  return {
    runPageEdit    : false,
    Definition     : '',
    updateImageNow : true,
    Description    : "Open Invoice Button",
    editArray      : ["msg-isDirty"],
    beforeFunction : function(data) {},
    serverFunction : function(elem){
                            window.view = true;
        jwt.jwtComponent.getData(
	    'jwt.jwtComponentConfigFull', jQuery(elem)
		.data("key") + "&UNLOCK=N");
                        },

    afterFunction  : function() {},
    canViewFunc    :  function(){  return !jwt.invoice.user.isLocked },
      buttonDefn     : { buttonClass : "alizarin-flat-button"
			 , buttonLabel    : "Open" }

  }
})();

jwt.routes['loc_WL_VIEW_APPROVER'] = (function() {
  return {
    runPageEdit    : false,
    Definition     : '',
    showProcess    : true,
    Description    : "View Invoice Button",
    updateImageNow : true,
    editArray      : ["msg-isDirty"],
    beforeFunction : function(data) {},
    serverFunction : function(elem){
                            window.view = true;
        jwt.jwtComponent.getData(
	    'jwt.jwtComponentConfigFull',
	    jQuery(elem).data("key") + "&UNLOCK=N");
                        },
    afterFunction  : function() {},
    canViewFunc    :  function(){  return !jwt.invoice.user.isLocked },
      buttonDefn     : { buttonClass : "sun-flower-button"
			 , buttonLabel    : "View" }

  }
})();

jwt.routes['XX_HPB_200'] = (function() {
  return {

    Definition     : 'XX_HPB_200',
    Description    : "Unlock Quick Page",
    editArray      : [],
    beforeFunction : function(data) {},
    serverFunction : function(){
        jwt.jwtComponent.getData(
	    'jwt.jwtComponentConfigQuick', null, this.form, 'XX_HPB_200');
                        },
    afterFunction  : function() {},
  }
})();

jwt.routes['XX_HPB_201'] = (function() {
  return {
    Definition     : 'XX_HPB_201',
    Description    : "Unlock Full Page",
    editArray      : [],
    beforeFunction : function(data) {},
    serverFunction : function(){
        jwt.jwtComponent
	    .getData('jwt.jwtComponentConfigFull', null,
		     this.form, 'XX_HPB_200');
                        },
    afterFunction  : function() {},
  }
})();

jwt.routes['loc_XX_HPB_001'] = (function() {
  return {
    runPageEdit    : true,
    Definition     : 'loc_XX_HPB_001',
    Description    : "Save Button",
    showProcess    : true,
    editArray      : [],
    beforeFunction : function(data) {},
    serverFunction : "XX_HPB_001",
    afterFunction  : function() {},
    canViewFunc    :  function(){  return !jwt.invoice.user.isLocked },
      buttonDefn     : { buttonClass : "sun-flower-button", buttonLabel
			 : "Save" }

  }
})();

jwt.routes['loc_XX_HPB_310'] = (function() {
  return {
    Definition     : 'loc_XX_HPB_310',
    runPageEdit    : true,
    runRefresh     : true,
    showProcess    : true,
    Description    : "Add invoice to be process que",
    editArray      : [],
    blankImageNow  : true,
    beforeFunction : function(data) {},
    serverFunction : "XX_HPB_310",
    canViewFunc    : function(){  return !jwt.invoice.user.isLocked },
    afterFunction  : function() {},
      buttonDefn     : { buttonClass : "concrete-flat-button"
			 , buttonLabel    : "Add" }
  }
})();

jwt.routes['loc_XX_HPB_320'] = (function() {
  return {
    Definition     : 'loc_XX_HPB_320',
    runPageEdit    : true,
    runRefresh     : true,
    showProcess    : true,
    Description    : "Save to invalid vendor que",
    editArray      : [],
    blankImageNow  : true,
    beforeFunction : function(data) {},
    serverFunction : "XX_HPB_320",
    canViewFunc    : function(){  return !jwt.invoice.user.isLocked },
    afterFunction  : function() {},
      buttonDefn     : { buttonClass : "alizarin-flat-button"
			 , buttonLabel    : "Invalid Vendor" }
  }
})();

jwt.routes['loc_XX_HPB_330'] = (function() {
  return {
    Definition     : 'loc_XX_HPB_330',
    runPageEdit    : true,
    runRefresh     : true,
    showProcess    : true,
    Description    : "Save to use tax que",
    editArray      : [],
    blankImageNow  : true,
    beforeFunction : function(data) {},
    serverFunction : "XX_HPB_330",
    canViewFunc    :  function(){  return !jwt.invoice.user.isLocked },
    afterFunction  : function() {},
      buttonDefn     : { buttonClass : "peter-river-flat-button"
			 , buttonLabel    : "Use Tax" }
  }
})();

jwt.routes['loc_XX_HPB_340'] = (function() {
  return {
    Definition     : 'loc_XX_HPB_340',
    runPageEdit    : true,
    Description    : "Save to Pending Que",
    runRefresh     : true,
    showProcess    : true,
    blankImageNow  : true,
    editArray      : [],
    beforeFunction : function(data) {},
    serverFunction : "XX_HPB_340",
    afterFunction  : function() {},
    canViewFunc    : function(){  return !jwt.invoice.user.isLocked },
      buttonDefn     : { buttonClass : "wet-asphalt-flat-button"
			 , buttonLabel    : "Pending" }
  }
})();

jwt.routes['loc_XX_HPB_350'] = (function() {
  return {
    Definition     : 'loc_XX_HPB_350',
    Description    : "Save as button click",
    showProcess    : true,
    runRefresh     : true,
    blankImageNow  : true,
    editArray      : [],
    beforeFunction : function(elem) {
                        jQuery('#XX_HDR_SC').val(jQuery(elem).data("value"));
                     },
    serverFunction : "XX_HPB_350",
    canViewFunc    : function(){  return !jwt.invoice.user.isLocked },
    afterFunction  : function() {}
  }
})();

jwt.routes['loc_XX_HPB_400'] = (function() {
  return {
    Definition     : 'loc_XX_HPB_400',
    runPageEdit    : true,
    runRefresh     : true,
    Description    : "Route button for SAS",
    editArray      : [],
    blankImageNow  : true,
    beforeFunction : function(data) {},
    serverFunction : "XX_HPB_400",
    afterFunction  : function() {},
      canViewFunc    : function(){ return !jwt.invoice.user.isLocked
				   && jwt.invoice.user.isSAS
				   && !jwt.invoice.user.isRET },
      buttonDefn     : { buttonClass : "concrete-flat-button"
			 , buttonLabel    : "Route" }
  }
})();

jwt.routes['loc_XX_HPB_600'] = (function() {
  return {
    Definition     : 'loc_XX_HPB_600',
    Description    : "Release button for SAS",
    editArray      : [""],
    runRefresh     : true,
    blankImageNow  : true,
    beforeFunction : function(data) {},
    serverFunction : "XX_HPB_600",
    afterFunction  : function() {},
      canViewFunc    : function(){ return  (
	  jwt.invoice.user.isRET && jwt.invoice.user.isFinApproved
	      && jwt.invoice.user.isSAS
	      && jwt.invoice.user.isValidforSASRelease )},
      buttonDefn     : { buttonClass : "wet-asphalt-flat-button"
			 , buttonLabel    : "Release" }
  }
})();

jwt.routes['loc_XX_HPB_520'] = (function() {
  return {
    Definition     : 'loc_XX_HPB_520',
      Description    : "Approve Pass button for invoice end users routes"
	  + "to approve pass page where they can add more users on the approval"
      +  "chain, approve and add a comment ",
    editArray      : [],
    beforeFunction : function() {
                    jwt.jwtComponentConfigFull.useAlternateCallback = true;
                        },
    serverFunction : "XX_HPB_001",
    afterFunction  : function() {},
      canViewFunc    : function(){ return !jwt.invoice.user.isLocked
				   && jwt.invoice.user.isApprover },
      buttonDefn     : { buttonClass : "pumpkin-flat-button", buttonLabel
			 : "Approve / Pass" }
  }
})();

jwt.routes['loc_XX_HPB_521'] = (function() {
  return {
    Definition     : 'loc_XX_HPB_521',
      Description    : "Reroute Button on main page -- this button pops up"
     +  "the reoute approval modal used by SAS ",
    editArray      : [],
    beforeFunction : function() {
        jwt.jwtComponentConfigFull.useAlternateCallback
	    = true;
                        },
    serverFunction : "XX_HPB_520",
    afterFunction  : function() {},
      canViewFunc    : function(){ return !jwt.invoice.user.isLocked
				   && jwt.invoice.user.isSAS
				   && jwt.invoice.user.isRET },
      buttonDefn     : { buttonClass : "pomegranate-flat-button"
			 , buttonLabel : "Reroute" }
  }
})();

jwt.routes['loc_XX_HPB_530'] = (function() {
  return {
    Definition     : 'loc_XX_HPB_530',
    Description    : "Deny button",
    runRefresh     : true,
    editArray      : ["msg-requires-Comment"],
    beforeFunction : function(data) {},
    blankImageNow  : true,
    serverFunction : "XX_HPB_530",
    afterFunction  : function() {},
      canViewFunc    : function(){ return !jwt.invoice.user.isLocked
				   && jwt.invoice.user.isSAS  },
      buttonDefn     : { buttonClass : "emerald-flat-button", buttonLabel
			 : "Deny" }
  }
})();

jwt.routes['loc_XX_HPB_540'] = (function() {
  return {
    Definition     : 'loc_XX_HPB_540',
    Description    : "Send to SAS",
    blankImageNow  : true,
    editArray      : ["msg-requires-Comment"],
    runRefresh     : true,
    beforeFunction : function(data) {},
    serverFunction : "XX_HPB_540",
    afterFunction  : function() {},
      canViewFunc    : function(){ return !jwt.invoice.user.isLocked
				   && jwt.invoice.user.isApprover },
      buttonDefn     : { buttonClass : "wisteria-flat-button", buttonLabel
			 : "Send to SAS" }
  }
})();

jwt.routes['loc_XX_HPB_500'] = (function() {
  return {
    Definition: 'loc_XX_HPB_500',
    Description: "Approve button",
    blankImageNow  : true,
    destroyPopUp   : true,
    runRefresh     : true,
    editArray      : ["msg-valFA-Approve"],
    beforeFunction : function(data) {
                     jQuery( "#XX_HDR_CT" ).val( jQuery("#temp-comment").val());
        jQuery( "#XX_HDR_LO" ).val(
	    jwt.invoice.user.approverList.join(",") );
                     },
    serverFunction : "XX_HPB_500",
    afterFunction  : function() {},
      canViewFunc    :  function(){ return !jwt.invoice.user.isLocked
				    && jwt.invoice.user.isApprover },
      buttonDefn     : { buttonClass : "nephritis-flat-button", buttonLabel
			 : "Approve" }
  }
})();

jwt.routes['loc_XX_HPB_501'] = (function() {
  return {
    Definition     : 'loc_XX_HPB_501',
    Description    : "Pass button",
    blankImageNow  : true,
    destroyPopUp   : true,
    runRefresh     : true,
    editArray      : ["msg-valFA-Pass"],
    beforeFunction : function(data) {
        jQuery( "#XX_HDR_CT" )
	    .val( jQuery("#temp-comment").val());
                 jQuery( "#XX_HDR_IP" ).val( "Y" );
        jQuery( "#XX_HDR_LO" ).val(
	    jwt.invoice.user.approverList.join(",") );
                        },
    serverFunction : "XX_HPB_500",
    afterFunction  : function() {
    },
      canViewFunc    : function(){ return !jwt.invoice.user.isLocked
				   && jwt.invoice.user.isApprover },
      buttonDefn     : { buttonClass : "peter-river-flat-button", buttonLabel
			 : "Pass" }
  }
})();

jwt.routes['loc_XX_HPB_410'] = (function() {
  return {
    Definition     : 'loc_XX_HPB_410',
    Description    : "re Route button on the re-route approval modal",
    blankImageNow  : true,
    runRefresh     : true,
    destroyPopUp   : true,
    editArray      : ["msg-requires-Comment-no-pop","msg-val-approver-reroute"],
    beforeFunction : function(data) {
        jQuery( "#XX_HDR_CT" )
	    .val( jQuery("#temp-comment").val());
        jQuery( "#XX_HDR_LO" )
	    .val( jwt.invoice.user.approverList.join(",") );
                     },
    serverFunction : "XX_HPB_410",
    afterFunction  : function() {},
      canViewFunc    :  function(){ return !jwt.invoice.user.isLocked
				    && jwt.invoice.user.isSAS
				    && jwt.invoice.user.isRET },
      buttonDefn     : { buttonClass : "peter-river-flat-button"
			 , buttonLabel    : "Re-route" }

  }
})();


jwt.routes['loc_S2_XX_LIN_PO'] = (function() {
  return {
    Definition     : 'loc_S2_XX_LIN_PO',
    Description    : "Add PO",
    showProcess    : true,
    editArray      : ["msg-requires-Comment"],
    beforeFunction : function(data) {},
    serverFunction : function(data){
        jQuery("<input name='XX_LIN_PO$"
	       + jwt.invoice.lineNumberAdd + "'   value='"
	       + data.PO_ID + "' >").appendTo(jwt.form);
        jQuery("<input name='XX_LIN_BU$"
	       + jwt.invoice.lineNumberAdd + "'   value='"
	       + data.BUSINESS_UNIT + "' >").appendTo(jwt.form);
                        if (jwt.activePageConfig == "jwtComponentConfigFull"){
                            jwt.jwtComponent.getData(
				'jwt.jwtComponentConfigFull', null
				, this.form, 'XX_HDR_PX_PB');
                          }
                     },
    afterFunction  : function() {},

  }
})();

jwt.routes['loc_S2_XX_LIN_PI'] = (function() {
  return {

    Definition     : 'loc_S2_XX_LIN_PI',
    Description    : "Add Project on full page",
    editArray      : [],
    beforeFunction : function(data) {                },
    serverFunction : function(data){
        jQuery("<input name='XX_LIN_PI$"
	       + jwt.invoice.lineNumberAdd + "'   value='"
	       + data.PROJECT_ID + "' >").appendTo(jwt.form);
        jwt.jwtComponent.getData(
	    'jwt.jwtComponentConfigFull', null, this.form, 'XX_HDR_PY_PB');
                        },
    afterFunction  : function() {},
  }
})();

jwt.routes['loc_row_delete'] = (function() {
  return {
    Description    : "User deletes row",
    editArray      : [],
    showProcess    : true,
    beforeFunction : function(data) {    },
    serverFunction : function(data){
        jwt.jwtComponent.getData(
	    'jwt.jwtComponentConfigFull', null, this.form,
	    jQuery(data).attr("name") );
                        },
    afterFunction  : function() {},
  }
})();

jwt.routes['loc_row_new'] = (function() {
  return {


    Description    : "User adds a row",
    editArray      : [],
    showProcess    : true,
    beforeFunction : function(data) {                    },
    serverFunction : function(data){
        jwt.jwtComponent.getData(
	    'jwt.jwtComponentConfigFull', null, this.form
	    , jQuery(data).attr("name") );
                        },
    afterFunction  : function() {},
  }
})();

jwt.routes['loc_XX_HPB_PRI'] = (function() {
  return {
    Definition     : 'loc_XX_HPB_PRI',
    Description    : "Print button",
    editArray      : [],
    beforeFunction : function(data) {},
    serverFunction : "",
    afterFunction  : function() {},
    canViewFunc    : function(){ return true},
      buttonDefn     : { buttonClass : "peter-river-flat-button", buttonLabel
			 : "Print" }
  }
})();
