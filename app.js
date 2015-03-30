require.config({
    paths: {

        CONSTANTS: "js/modules/CONSTANTS",
        ERRORS: "js/modules/ERRORS",
        FIELDS: "js/modules/FIELDS",

        jwt: "js/modules/APPLICATION_INIT",
        jwtWorkListConfig_SAS: "js/modules/TABS_SAS",
        jwtWorkListConfig_APP: "js/modules/TABS_APPROVERS",
        worklist: "js/modules/LOADER_TABS",
        jwtData: "js/modules/DATA",
        loader_data: "js/modules/LOADER_DATA",
        loader_page: "js/modules/LOADER_PAGE",
        loader_routes: "js/modules/LOADER_ROUTES",
        loader_errors: "js/modules/LOADER_ERROR",
        ROUTES: "js/modules/ROUTES",
        quickPage: "js/modules/PAGE_QUICK",
        fullPage: "js/modules/PAGE_FULL",

        approvePage: "js/modules/PAGE_APPROVE",
        jwtChat: "js/modules/inichat",
        templates: "js/modules/TEMPLATES_HASH",
        templatesJS: "js/html/templates",
        misfunc: "js/modules/FUNCTIONS",
        S2: "js/modules/SELECT2",

        jquery: "js/libs/jquery",
        jqueryui: "js/libs/jquery-ui",
        tablesorter: "js/libs/jquery.tablesorter.min",
        tablesorterPager: "js/libs/jquery.tablesorter.pager.min",
        tablesorterWidgets: "js/libs/jquery.tablesorter.widgets",
        //      tablesorterWidgets   : "libs/jquery.tablesorter.widgets.min",
        tablesorterFilterFormatter:
	   "js/libs/jquery.tablesorter.widgets-filter-formatter.min",
        tablesorterFilterFormatterSelect2:
	   "js/libs/jquery.tablesorter.widgets-filter-formatter-select2",
        moment: "js/libs/moment",
        lunr: "js/libs/lunr",
        underscore: "js/libs/underscore",
        Mustache: "js/libs/Mustache",
        handlebars: "js/libs/handlebars-v2.0.0",
        select2: "js/libs/select2",
        prettyCheck: "js/libs/prettyCheckable.min",
        highlighter: "js/libs/highlighter"
    },
    shim: {
        underscore: {
            exports: "_"
        },
        highlighter: {
            deps: ["jquery"]
        },
        select2: {
            deps: ["jquery"]
        },
        moment: {
            deps: ["jquery"],
            exports: "moment"
        },
        prettyCheck: {
            deps: ["jquery"],
            exports: "prettyCheck"
        },
        lunr: {
            deps: ["jquery"],
            exports: "lunr"
        },
        jwtChat: {
            deps: ["jquery"],
        },
        jqueryui: {
            deps: ["jquery"],
        },
        tablesorter: {
            deps: ["jquery"],
            exports: "tablesorter"
        },
        approvePage: {
            deps: ["jquery", "templates"]
        },
        CONSTANTS: {
            deps: ["jquery"]
        },
        ERRORS: {
            deps: ["jquery" ,"CONSTANTS"]
        },
        FIELDS: {
            deps: ["jquery"]
        },
        loader_routes: {
            deps: ["jquery"]
        },

        ROUTES: {
            deps: ["jquery", "loader_routes"]
        },
        jwtChat: {
            deps: ["jquery"]
        },
        quickPage: {
            deps: ["jquery", "templates", "jqueryui", "prettyCheck", "select2"]
        },
        fullPage: {
            deps: ["jquery", "templates", "misfunc"]
        },
        tablesorterPager: {
            deps: ["jquery", "tablesorter"],
        },
        tablesorterWidgets: {
            deps: ["jquery", "tablesorter"],
        },

        tablesorterFilterFormatter: {
            deps: ["jquery", "tablesorter", "tablesorterWidgets", "tablesorterPager", "select2"],
        },
        tablesorterFilterFormatterSelect2: {
            deps: ["jquery", "tablesorter", "tablesorterWidgets", "tablesorterPager", "select2"],
        },
        jwt: {
            exports: "jwt"
        },
        templates: {
            deps: ["jquery", "templatesJS", "underscore", "Mustache"],
        },
        templatesJS: {
            deps: ["jquery"],

        },
        worklist: {
            deps: ["jquery", "tablesorter", "tablesorterWidgets", "tablesorterPager", "select2"],
        },
        misfunc: {
            deps: ["jquery", "underscore", "select2"],
        },
        S2: {
            deps: ["jquery", "underscore", "select2", "highlighter" , "ERRORS"],
        },
        loader_data: {
            deps: ["jquery", "lunr", "S2"],
        },
        loader_errors: {
            deps: ["jquery"],
        },
        jwtData: {
            deps: ["jquery", "lunr", "S2"],
        },
        loader_page: {
            deps: ["jquery"],
        },
        Mustache: {
            deps: ["jquery"],
            exports: "Mustache"
        },
        handlebars: {
            deps: ["jquery"],
            exports: "handlebars"
        },
        jwtWorkListConfig_SAS: {
            deps: ["jquery"],
        },
        jwtWorkListConfig_APP: {
            deps: ["jquery"],
        }
    }
});

require(
    ["handlebars", "lunr", "tablesorter", "jwt", "jwtWorkListConfig_SAS", "templates", "Mustache", "loader_data", "worklist", "jwtData", "loader_page", "misfunc", "tablesorterPager", "moment", "CONSTANTS", "ROUTES", "loader_routes", "quickPage", "fullPage", "jqueryui", "prettyCheck", "select2", "highlighter", "tablesorterWidgets", "tablesorterFilterFormatter", "tablesorterFilterFormatterSelect2", "jwtWorkListConfig_APP", "approvePage", "ERRORS", "loader_errors", "FIELDS"],
    function(handlebars, lunr, tablesorter, jwt, jwtWorkListConfig_SAS, templates, Mustache, _, _, _, _, _) {

        var url_jwt = document.URL.replace(/\/\s*$/, '').split('/');

        jwt.Mustache = Mustache;
        jwt.handlebars = handlebars;
        jwt.lunr = lunr;
        jwt.functions.init();

        jwt.o.ErrorStoreFunctions.init();
        jwt.o.S2Functions.init();

        var tourl = "http://" + location.host + "/psc/" + url_jwt[4] + '/EMPLOYEE/ERP/s/WEBLIB_XX_NAV.WEBLIB_FUNCTION.FieldFormula.iScript_xxGetInitObject_289';
        var jqXHRoptions2 = {
            type: "POST",
            url: tourl,
            contentType: "application/json; charset=utf-8"
        };

        jQuery.ajax(jqXHRoptions2).done(
            function(data, textStatus, jqXHR, Mustache, handlebars) {
                jwt.user = jQuery.extend({}, jQuery.parseJSON(data));
                jwt.templates.init();
                jwt.init();
                jwt.jwtWorkList.init();
                jwt.jwtData.initAllData();
                jwt.jwtComponent.init('jwt.jwtComponentConfigQuick', jwt.jwtComponentConfigQuick);
                jwt.jwtComponent.init('jwt.jwtComponentConfigFull', jwt.jwtComponentConfigFull);
            })

    },
    function(err) {

    }
);
