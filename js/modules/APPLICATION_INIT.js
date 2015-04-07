var jwt = (function() {

    var isDirty = false;
    var timer = "";
    var timeout = 3600;
    var c = timeout;
    var t;
    var timer_is_on = 0;
    var url_xx = document.URL.replace(/\/\s*$/, '').split('/');
    var logoutLink = "http://" + location.host + "/psp/" + url_xx[4]
	+ "?cmd=logout";
    var homeLink = "http://" + location.host + "/psp/" + url_xx[4]
	+ "/EMPLOYEE/ERP/h/?tab=DEFAULT";
    var xUrlnewWindow  = "/EMPLOYEE/ERP/s/WEBLIB_PTPP_SC.HOMEPAGE.FieldFormula."
        + "IScript_AppHP?scname=ADMN_JWT_CONTROL_CENTER&secondary=true&fname="
        + "ADMN_F200802151000401446575923&PORTALPARAM_PTCNAV=PT_PTPP_SCFNAV_"
        + "BASEPAGE_SCR&FolderPath=PORTAL_ROOT_OBJECT.PORTAL_BASE_DATA.CO_"
        + "NAVIGATION_COLLECTIONS.ADMN_JWT_CONTROL_CENTER.ADMN_"
        + "F200802151000401446575923&IsFolder=true";
    var newWinLink = "http://" + location.host + "/psp/" + url_xx[4]
	+ xUrlnewWindow;

    // this is a simple timeout that will allow the user to wipe the counter if
    // they choose OK
    
    function timedCount() {
        c = c - 1;
        if (c < 30) {
            var parms = {
                ok: true,
                cancel: false,
                message: "No Activity.  Click OK to continue",
                loadTemplate: jwt.templates.loadPopUp,
                popCallback: function() {
                    c = timeout
                }
            };
            jwt.templates.loadTemplate(parms);
        }
        if (c < 0) {
            console.log('you are logged out');
            window.location.href = logoutLink;
        }
    
        t = setTimeout(function() {
            timedCount()
        }, 1000);
    }

    var stopCount = function() {
        clearTimeout(t);
        c = timeout;
        jwt.timedCount();
    }

    var init = function(row, worklist, that) {

        jQuery("#processing").on('hide.processing', function() {
            jQuery(this).hide()
        })
        jQuery("#processing").on('show.processing', function() {
            jQuery(this).show()
        })

        // the user really doesn't need to wait for anything the obects
	// can be loaded in to the page without any consistency issues
	
        function f() {
            if (jwt.jwtData.hasOwnProperty('XX_289_D_APPROV')
		&& jwt.jwtData.hasOwnProperty('XX_APPROVERS')
		&& jwt.jwtData.hasOwnProperty('XX_289_D_PO_02')) {
                jQuery("#processing").trigger('hide.processing');
            } else {
                setTimeout(f, 1000)
            }
        }

        setTimeout(f, 1000)

        this.timedCount();

        //build the tabs based on the user type
        if (jwt.user.isSAS) {
            var template = jwt.templates["ms_00_index_ul_SAS"];
            jQuery.extend(jwt.jwtWorkList, jwt.jwtWorkListConfig_SAS);
        } else {
            var template = jwt.templates["ms_00_index_ul_APR"];
            jQuery.extend(jwt.jwtWorkList, jwt.jwtWorkListConfig_APR);
        }

        var outHTML = jwt.Mustache.to_html(template);

        jQuery("#work-list-menu").html(outHTML);

        //the pager for the worklist tablesorter table.

        var pagerOptions = {
            container: jQuery(".pager"),
            output: '{startRow} - {endRow} / {filteredRows} ({totalRows})',
            fixedHeight: true,
            size: 25,
            removeRows: false,
            cssGoto: '.gotoPage'
        };

        newWinFunction = function(url) {
            window.open(url, '', '');
        }

        directLink = function(url) {
            window.location.href = url;
        }

        document.querySelector("#home-link")
	    .addEventListener("click", function(e) {
            jwt.functions.saveWarning(directLink(homeLink))
        });

        document.querySelector("#log-out-link")
	    .addEventListener("click", function(e) {
            jwt.functions.saveWarning(directLink(logoutLink))
        });

        document.querySelector("#new-window-link")
	    .addEventListener("click", function(e) {
            jwt.functions.saveWarning(newWinFunction(newWinLink));
        });
        //refresh button
        document.querySelector("#work-list-refresh")
	    .addEventListener("click", function(e) {
            e.preventDefault();
            jQuery("section#work-lists table").remove();
            jwt.jwtWorkList.reset_Tabs();
            jwt.jwtWorkList.init();
            jQuery.extend(jwt.jwtWorkList, jwt.jwtWorkListConfig);
            jQuery("#component-data , #image-now").empty();
        });

        jQuery(".close-image-now").on("click", function() {
            var imageNow = jQuery("#image-now");
            //(imageNow.width()< 22 )?imageNow.width('50%'):imageNow.width(1)
        });
        //tab clicks
        jQuery('#work-list-menu li  a').on('click', function(event) {
            var resetTo = jQuery("#image-now").css("display");
            jQuery(".component").css("display","none");
            jQuery(".close-image-now").hide();
            jQuery(".wlClose").off("click.xx").on("click.xx", function() {
                // jQuery("#image-now").css("display" , resetTo );
                // jQuery("#image-now").width('50%') ;
            });
            jQuery("#image-now").width(1);
            jQuery("section#work-lists  table").removeClass('displayHidden')
		.removeClass('displayBlock').trigger('destroy.pager');
            jQuery("section#work-lists  table#wl-tbl-"
		   + (jQuery(this).parent().index())).addClass('displayBlock')
		.tablesorterPager(pagerOptions);
            jQuery('#work-list-menu  li')
                .css('background-color', 'yellow')
		.css('color', 'white');
            jQuery(this).parent().css('background-color', 'blue')
		.css('color', 'white');
            jQuery('section#work-lists , .wlHeader').css('display', 'block');
        });
        var that = this;
        jQuery(document).on("change", "#component-data input", function() {
            that.isDirty = true;
        });
    }
    return {
        init: init,
        isDirty: isDirty,
        timer: timer,
        stopCount: stopCount,
        timedCount: timedCount
    };

})();
