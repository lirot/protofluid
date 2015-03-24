jwt.routes = (function() {

    var defaults = {
        init: function() {},
        index: [],
        viewPopUP: function(key) {},
        requestType: 'J',
        contentTypeResponse: 'json',
        SelectData: [],
        url: '/EMPLOYEE/ERP/s/WEBLIB_XX_MJSON.ISCRIPT1.FieldFormula.iScript_xxGet_Json_Data?',
        indexKey: function(data) {
            return ''
        }
    }

    var url_xx = document.URL.replace(/\/\s*$/, '').split('/');

    var run_Edits = function(definition, obj) {
        //run edits runs a array of error objects called by the route_loader
        //but can also be called independently as in the call back of the full page
        // to load server errors
        var pageCongfig = jwt[definition];
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
            ret.push(jwt.error.createError.call(that, errorObject))
        });
        jQuery(".messages").trigger("hasError");
        return !_.contains(ret, !true);
    };

    var xx_bind_buttons = function(row) {
        var routes = jQuery("[data-route-id]", row || jQuery('#content') ),
            pageConfig;

        _.each(routes, function(obj) {
            var route = {};
            routeID = jQuery(obj).attr('data-route-id');
            route = jwt.routes[routeID];

            jQuery(obj).off("click." + routeID)
                .on("click." + routeID, function(event) {
                    var retPageEdits = true,
                        retRouteEdits = true,
                        ret = false;
                    event.preventDefault();
                    routeID = jQuery(this).attr('data-route-id');
                    route = jwt.routes[routeID];
                    pageConfig = jwt[jwt.activePageConfig];

                    if (route.hasOwnProperty("runPageEdit")) {
                        if (route.runPageEdit == true) {
                            retPageEdits = jwt.routes.run_Edits.call(this, jwt.activePageConfig, pageConfig);
                            if (retPageEdits) {
                                jwt[jwt.activePageConfig].controller();
                            }
                        }
                    }

                    if (route.hasOwnProperty("editArray")) {
                        retRouteEdits = jwt.routes.run_Edits.call(this, jwt.activePageConfig, route);
                    }

                    if (retPageEdits && retRouteEdits) {
                        if (route.hasOwnProperty("showProcess")) {
                            if (route.showProcess) {
                                jQuery("#processing").trigger('show.processing');
                            }
                        }
                        route.beforeFunction(this);
                        if (typeof route.serverFunction == "function") {

                            route.serverFunction(this);

                            if (route.hasOwnProperty("updateImageNow")) {
                                if (route.updateImageNow) {

                                    if ( jwt.user.oldimageNowDocID != jwt.user.imageNowDocID){
                                         jQuery("#image-now").html("<iframe id='INiframe' class='imageNowIframe' src='" + jwt.constants.imgNowURL + jQuery(this).data("imgnowkey") + "'  ></iframe>");
                                         jwt.user.oldimageNowDocID = jwt.user.imageNowDocID;
                                    }
                                }
                            }
                        } else {
                            jwt.jwtComponent.getData('jwt.jwtComponentConfigFull', null, this.form, route.serverFunction);
                            if (route.hasOwnProperty("blankImageNow")) {
                                if (route.blankImageNow
                                      && 
                                        ( jwt.user.oldimageNowDocID != jwt.user.imageNowDocID )
                                        )
                                    {
                                    //jQuery("#image-now").html("");
                                }
                            }
                        }
                        if (route.hasOwnProperty("destroyPopUp")) {
                            if (route.destroyPopUp) {
                                jQuery("#popModal").html("");
                                jQuery("#image-now").css("width", "50%");
                                jQuery("#component-data").css("width", "50%");
                            }
                        }



                        if (route.hasOwnProperty("runRefresh")) {
                            if (route.runRefresh) {
                                setTimeout(
                                    function() {
                                        jQuery("section#work-lists table").remove();
                                        jwt.jwtWorkList.reset_Tabs()
                                        jwt.jwtWorkList.init();
                                    }, 2000);
                            }
                        }
                    }
                }) /* end the on bind */

            if (route.hasOwnProperty("buttonDefn")) {
                jQuery(obj).addClass(route.buttonDefn.buttonClass)
                    .prop('title', route.Description)
                    .html(route.buttonDefn.buttonLabel)
            }
        }); /* end of the each to find eleemts to bind */

    };

    return {
        run_Edits: run_Edits,
        xx_bind_buttons: xx_bind_buttons
    }
})();
