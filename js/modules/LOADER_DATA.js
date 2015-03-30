jwt.jwtData = (function() {
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//any of the data objectsa will pull defaults off this object
//data objects make ajax calls to pull json data primarily for the drop downs
    
    var s2optionsDO = {};
    var defaults = {
        init: function() {},
        index: [],
        viewPopUP: function(key) {},
        requestType: 'J',
        contentTypeResponse: 'json',
        SelectData: [],
        url:   '/EMPLOYEE/ERP/s/WEBLIB_XX_MJSON.ISCRIPT1.FieldFormula.'
	     + 'iScript_xxGet_Json_Data?',
        indexKey: function(data) {
            return ''
        }
    }

    var Configs = {};
    var url_xx = document.URL.replace(/\/\s*$/, '').split('/');

    // an inplace decode from escaped html characters to human readable
    var decode = function(data) {
        for (var property in data) {
            if (data.hasOwnProperty(property)) {
                data[property] = decodeURIComponent(data[property]);
            }
        }
    };

    function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1)
	                                         .join(z) + n;
    }

    //lunr search is used to search the drop downs
    //the system will build a lunr search this mehtod and properties from the
    //data objects
    var create_Lunr_search = function(config) {

        var that = config,
            vals, field = {};

        config.lunr_index = new jwt.lunr.Index;
        config.lunr_index.ref(that.reference);

        //allows for an all display if the user clicks on the drop down
        if (config.hasOwnProperty('is_lunr_show_all')) {
            that.lunr_index.field("all", 1);
        }

        //pipeline functions on the data objects handle dependencies
        if (config.hasOwnProperty("lunrPipelineFunction")) {
            var pipelinefunction = config.lunrPipelineFunction;
            config.lunr_index.pipeline.add(pipelinefunction)
        }

        //key fields will come off the data objects
        _.each(that.keyfields, function(val) {
            vals = val.split(":");
            that.lunr_index.field(vals[0], (vals[1] | 1));
        });

        _.each(that.directkeyfields, function(val) {
            vals = val.split(":");
            that.lunr_index.field(vals[1] + ":" + vals[0], 100);
        })
    }

    //when the ajax data is process the system will use this method to add
    //fields to the lunr search index
    var add_fields_lunr_search = function(config, data) {

        var that = config;
        var vals;
        var field = {};

        var str = "";

        field[that.reference] = data[that.reference];

        _.each(that.keyfields, function(val) {
            vals = val.split(":");
            field[vals[0]] = decodeURIComponent(data[vals[0]]);
        })

        _.each(that.directkeyfields, function(val) {
            vals = val.split(":");
            field[vals[1] + ":" + vals[0]] = vals[1] + ":" +
		            decodeURIComponent(data[vals[0]]);
        })

        if (config.hasOwnProperty('is_lunr_show_all')) {
            field["all"] = "all:all"
        }

        that.lunr_index.add(field);

    };

    //the main ajax callback for the data objects
    var parse = function(config, response, key, jqXHR) {

        var jsonObj = {},
            hashKey, totalKeys,
            indexKey, jsonObj = response,
            totalLines = jsonObj.VIEW[0].LINE.length;

        if (totalLines == 0) {
            return
        }

        var start = moment();

        var xhr = arguments[3];

        if (config.hasOwnProperty('is_lunr_search')
	    && !config.hasOwnProperty("lunr_index")) {
            this.create_Lunr_search(config);
        }

        for (var i = 0, line = {}; i < totalLines; i++) {

            line = jsonObj.VIEW[0].LINE[i];
            line.number = i;

            if (config.hasOwnProperty('is_lunr_search')) {
                this.add_fields_lunr_search(config, line);
                key = jsonObj.VIEW[0].LINE[i][config.reference];
            }

            //the data is stored in the dom with a hash key
            //the entire line is stored using jquery data object
            hashKey = key.hashCode().toString();
            config.xxData.data("_" + hashKey, line);

        }

        totalKeys = Object.keys(config.xxData.data()).length;

        if (totalLines == totalKeys) {
            jwt.jwtData[config.Definition] = config.xxData.data();
        } else {
            jwt.jwtData[config.Definition] = jQuery.extend(
		jwt.jwtData[config.Definition], config.xxData.data());
        }

        var end = moment();

        //display stuff around the data being cached...comment in prd
        console.log("complete " + config.Definition + ": "
		    + Math.round(Number(xhr.getResponseHeader(
			'Content-Length')) / 1000) + "kb lines: " +
		    totalLines + " keys: " + totalKeys + " s: " +
		    moment(end - start).format("ss") + " ms: " +
		    moment(end - start).format("SSS"));

        if (typeof config.callback === 'function') {
            config.callback(jsonObj, config);
        }

    };

    var xxAjax = function(config, value, def) {
        var dfd = def;

        if (config.requestType == 'J') {
            if (typeof value.column2 === 'string') {
                config.qryString1.CoumnList[0].Column_Value = value.column1;
                config.qryString1.CoumnList[1].Column_Value = value.column2;
                config.contextKey = value.column1 + value.column2;
            }
            if (typeof value === 'string') {
                if (typeof config.qryString1 === 'function') {
                    config.qryString1 = config.qryString1();
                    config.qryString1.CoumnList[0].Column_Value = value;
                } else {
                    config.qryString1.CoumnList[0].Column_Value = value;
                }
            }
        }

        var tourl = "http://" + location.host + "/psc/" + url_xx[4]
	    + config.url + 'DATA_REQUEST[1]=' + JSON.stringify(
		config.qryString1);

        var jqXHRoptions2 = {
            type: "POST",
            url: tourl,
            contentType: "application/json; charset=utf-8",
            dataType: config.contentTypeResponse,
            async: true
        };

        var that = this;
        that.jqXHRoptions2 = jqXHRoptions2;

        var xhr = jQuery.ajax(jqXHRoptions2).done(
            function(data, textStatus, jqXHR) {
                function func_process(){
                parse.call(that, config, data, value, jqXHR);
            }
            setTimeout( func_process , 1500);
            },
            function(data, textStatus, jqXHR) {
                if (typeof def == 'object') {
                    def.resolve();
                }
            }).fail(
            function(data, textStatus, jqXHR) {
                console.log('fail' + data.responseText);
            })
    }

    //simple helper function to get the data object by hash key
    var setPromptVal = function(val, tblname) {
        var s = '',
            j = '';
        var hash = val.hashCode().toString();
        if (jwt.jwtData.hasOwnProperty(tblname)) {

            if (jwt.jwtData[tblname].hasOwnProperty("_" + hash)) {
                var tblrow = jwt.jwtData[tblname]["_" + hash];
                s = decodeURIComponent(jwt.jwtData.Configs[tblname]
				       .select2Callback(tblrow));
                return {
                    id: hash,
                    text: s
                }
            }

        }
        console.log('prompt not ready' + tblname)
    }

    //init actually runs the ajax request and when done the data is fully
    //cached and available for a lunr search
    var init = function(key, obj, value, def) {

        var newDefaults = jQuery.extend(true, {}, this.defaults);
        var config = jQuery.extend(obj, newDefaults);

        if (config.hasOwnProperty('s2optionsDO')) {
            config.s2optionsDO = jQuery.extend(true,
					       {}, jwt.jwtData.s2optionsDO);
        }

        var dfd = def;
        var that = this;
        jQuery.each(value,
            function(indx, value) {
                return that.getData(config, value, dfd);
            });

    }

    //this is the set of data we get on load of the application
    var initAllData = function() {

        //project data is loaded on the call back for business unit
        jwt.jwtData['XX_289_D_PRJ_01'] = {};

        if (jwt.user.isSAS) {
            jwt.jwtData.init('XX_289_D_VND_LC',
			     jwt.jwtData.Configs['XX_289_D_VND_LC'], ['SHARE']);
        }
	
        jwt.jwtData.init('XX_289_D_APPROV',
			 jwt.jwtData.Configs['XX_289_D_APPROV'], ['KEY'], '');
        jwt.jwtData.init('XX_APPROVERS',
			 jwt.jwtData.Configs['XX_APPROVERS'], ['KEY'], '');
        jwt.jwtData.init('XX_289_D_PO_02',
			 jwt.jwtData.Configs['XX_289_D_PO_02'], ['ALL']);
        jwt.jwtData.init('XX_289_D_SHIPTO',
			 jwt.jwtData.Configs['XX_289_D_SHIPTO'], ['SHARE']);

        jwt.jwtData.init('XX_289_D_SC_01',
			 jwt.jwtData.Configs['XX_289_D_SC_01'], ['ALL']);

        //jwt.jwtData.init('XX_289_D_BU_SEC',
	//jwt.jwtData.Configs['XX_289_D_BU_SEC'], [jwt.user.operID]);

	jwt.jwtData.init('XX_289_D_BU_SEC',
			 jwt.jwtData.Configs['XX_289_D_BU_SEC'],
			     ["JWTJSUFFEL01"]);

        //used for second row of grid lines
        jwt.jwtData.init('XX_289_D_UNIT',
			 jwt.jwtData.Configs['XX_289_D_UNIT'], ['KEY']);

        jwt.jwtData.init('MASTER_ITEM_TBL',
			 jwt.jwtData.Configs['MASTER_ITEM_TBL'], ['SHARE']);
	
        jwt.jwtData.init('ASSET', jwt.jwtData.Configs['ASSET'], ['10050']);
	
        jwt.jwtData.init('PROFILE_TBL',
			 jwt.jwtData.Configs['PROFILE_TBL'], ['SHARE']);

    }

    return {
        s2optionsDO: s2optionsDO,
        defaults: defaults,
        getData: xxAjax,
        init: init,
        initAllData: initAllData,
        Configs: Configs,
        decode: decode,
        setPromptVal: setPromptVal,
        create_Lunr_search: create_Lunr_search,
        add_fields_lunr_search: add_fields_lunr_search

    }
})();
