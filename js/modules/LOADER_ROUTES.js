jwt.routes = (function() {
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*
File : LOADER_ROUTES.js
Descr: xx_bind_buttons method iterates over a set of elements defined as routes
       rotues are defined by the data-route-id attribute
       implements the route facility
*/
    var defaults = {
        init: function() {},
        index: [],
        viewPopUP: function(key) {},
        requestType: 'J',
        contentTypeResponse: 'json',
        SelectData: [],
        url: '/EMPLOYEE/ERP/s/WEBLIB_XX_MJSON.ISCRIPT1.'
             + 'iScript_xxGet_Json_Data?',
        indexKey: function(data) {
            return '';
        }
    };

    var url_xx = document.URL.replace(/\/\s*$/, '').split('/');

    var run_Edits = function( obj , callback) {
        var error_Array = obj.editArray;
        var ret = [];
        var that = this;
	
        _.each(error_Array, function(val) {
            var errorObject = {};
            if (typeof val === 'string') {
                errorObject = jwt.constants.ERRORS[val];
            } else {
                errorObject = val;
            }
            errorObject.route = obj;
            ret.push(jwt.error.createError.call(that, errorObject));
        });

        if ( typeof callback === 'function' ){

            callback();
        }
        
        jQuery(".messages").trigger("hasError");
        return !_.contains(ret, !true);
    };

  var xx_bind_buttons = function(row) {
/* routes are defined in the markup with attributes 
   routes are buttons that take click events to an server side
   transaction or within a server side transaction
   routes require certain page edits and conditional processing
   routes are defined as javascript objects at jwt.routes
   xx_bind_buttons handles the creation of the click object 
   facitiliy for routes
*/
      /* route binding is done on the row for a worklist tab table when
         the table is created or at the end of the call back for a page
      */
      
      var routes = jQuery("[data-route-id]",
			  row || jQuery('#content , #popModal') ),
	  pageConfig;

     _.each(routes, function(obj) {
       var routeObj = {};
       routeID = jQuery(obj).attr('data-route-id');
       routeObj = jwt.routes[routeID];

	 jQuery(obj)
	     .off("click." + routeID)
             .on("click." + routeID ,
		  function(event) {
                      var retPageEdits = true,
		          retRouteEdits = true,
		       ret = false;
		     
                    event.preventDefault();
                    routeID = jQuery(this).attr('data-route-id');
                    routeObj = jwt.routes[routeID];
                    pageConfig = jwt[jwt.activePageConfig];

                    if (routeObj.hasOwnProperty("runPageEdit")) {
			if (routeObj.runPageEdit == true) {
			/* call with the element as 'this'*/
			retPageEdits = jwt.routes.run_Edits
				          .call(this,  pageConfig);
			  if (retPageEdits) {
			      /* the page may want to do some work if the 
				 edits are passed */
                                jwt[jwt.activePageConfig].controller();
                            }
                        }
                    }

                    if (routeObj.hasOwnProperty("editArray")) {
                        retRouteEdits = jwt.routes.run_Edits
			    .call(this,  routeObj );
                    }
		    /* the client side edits are in a pass condition*/
                    if (retPageEdits && retRouteEdits) {
                      if (routeObj.hasOwnProperty("showProcess")) {
                        if (routeObj.showProcess) {
                            jQuery("#processing").trigger('show.processing');
                            }
                      }
		      /* call the before function  on the route obect*/
			routeObj.beforeFunction(this);
		      /* the main call for retrieving the page two possibilites
                         either a full function */
                      if (typeof routeObj.serverFunction == "function") {
                        routeObj.serverFunction(this);

                          if (routeObj.hasOwnProperty("updateImageNow")) {
                            if (routeObj.updateImageNow) {
			      if ( jwt.user.oldimageNowDocID !=
				jwt.user.imageNowDocID){
                                 jQuery("#image-now").html(
"<iframe id='INiframe' class='imageNowIframe' src='" +
 		        jwt.constants.imgNowURL +
			jQuery(this).data("imgnowkey") + "' ></iframe>");
                        jwt.user.oldimageNowDocID = jwt.user.imageNowDocID;
                                    }
                                }
                           }  /*end image now update */
                      } else {
		       /* the second possibility will call up to the server
			  with the server function string on the route object*/
                          jwt.jwtComponent.getData('jwt.jwtComponentConfigFull',
			       null, this.form, routeObj.serverFunction);
                      }

			/* routes called from the approval page need to do
			 clean up here */
		      if (routeObj.hasOwnProperty("destroyPopUp")) {
                            if (routeObj.destroyPopUp) {
                                jQuery("#popModal").html("");
                                jQuery("#image-now").css("width", "50%");
                                jQuery("#component-data").css("width", "50%");
                            }
                      }
		     /* routes needing to update worklist information */
                      if (routeObj.hasOwnProperty("runRefresh")) {
                        if (routeObj.runRefresh) {
                          setTimeout( function() {
		            jQuery("section#work-lists table")
				    .remove();
                              jwt.jwtWorkList.reset_Tabs();
                                jwt.jwtWorkList.init();
                                    }, 2000);
                            }
                       }
                    } /*end of passed errors test */
                 }) /* end the on bind */
	 
	    /* the route buttons will be styled determined by the defin*/
            if (routeObj.hasOwnProperty("buttonDefn")) {
                jQuery(obj).addClass(routeObj.buttonDefn.buttonClass)
                    .prop('title', routeObj.Description)
                    .html(routeObj.buttonDefn.buttonLabel);
            }
        }); /* end of the each to find eleemts to bind */
    };

    return {
        run_Edits: run_Edits,
        xx_bind_buttons: xx_bind_buttons
    };
})();
