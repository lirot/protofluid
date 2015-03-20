jwt.templates = (function() {

  return {

    listTemplates: [
    {
      'name': 'QuickTemplate',
      'target': jwt.templates.PAGE_QUICK
    },
    {
      'name': 'FullTemplate',
      'target': jwt.templates.PAGE_FULL
    },
    {
      'name': 'UnlockTemplate',
      'target': jwt.templates.ms_01_dialog_unlock
    },
    {
      'name': 'ApproveTemplate',
      'target': jwt.templates.PAGE_APPROVE
    },
    {
      'name': 'PopUp',
      'target': jwt.templates.POPUP
    },
    {
      'name': 'COMMENT',
      'target': jwt.templates.COMMENT
    },
    {
      'name': 'TOOLTIP',
      'target': jwt.templates.TOOLTIP
    },
    {
      'name': 'TOOLTIP_PO_INFO',
      'target': jwt.templates.TOOLTIP_PO_INFO
    },
    {
      'name': 'TOOLTIP_PROJECT_INFO',
      'target': jwt.templates.TOOLTIP_PROJECT_INFO
    },
    {
      'name': 'SELECT2_PO',
      'target': jwt.templates.SELECT2_PO
    },
    {
      'name': 'SELECT2_PROJECT',
      'target': jwt.templates.SELECT2_PROJECT
    },

    {
      'name': 'ms_00_index_ul_APR',
      'target': jwt.templates.TABS_APPROVERS
    },
    {
      'name': 'ms_00_index_ul_SAS',
      'target': jwt.templates.TABS_SAS
    },
    {
      'name': 'APPROVER_ADD_LIST',
      'target': jwt.templates.APPROVER_ADD_LIST
    },
    {
      'name': 'ms_error',
      'target': jwt.templates.ms_error
    },
    {
      'name': 'ms_AWE',
      'target': jwt.templates.ms_AWE
    },
    {
      'name': 'SELECT2_XX_APPROVER',
      'target': jwt.templates.SELECT2_XX_APPROVER
    },
    {
      'name': 'SELECT2_VENDOR',
      'target': jwt.templates.SELECT2_VENDOR
    },
    {
      'name': 'SELECT2_ADD_HEADER',
      'target': jwt.templates.SELECT2_ADD_HEADER
    },
    {
      'name': 'SELECT2_ADD_FOOTER',
      'target': jwt.templates.SELECT2_ADD_FOOTER
    },
    {
      'name': 'VENDOR_INFO',
      'target': jwt.templates.VENDOR_INFO
    }
    ],

    init                  : function() {
                                //creates all the factory functions off the jwt.templates object
                                //allowing for easy access
                              _.each(jwt.templates.listTemplates, function(value, key) {
                                jwt.templates[value.name] = value.target;
                              });
                            },

    loadTemplate         : function(config) {
                              return config.loadTemplate(config);
                              },

    loadQuickTemplate    : function(config) {

                          var _config = config,
                            template = jwt.templates[config.templateName],
                            outHTML = jwt.Mustache.to_html(template, jwt.header);

                          jQuery("#component-data").html(outHTML);

                          jwt.jwtComponent
                            .Configs['jwt.' + _config.Definition]
                            .callback(_config);
                          },

    loadFullTemplate   : function(config) {

                          var _config = config,
                            template = jwt.templates[config.templateName],
                            outHTML = jwt.Mustache.to_html(template, jwt.invoice);

                          jQuery("#component-data").html(outHTML);

                          jwt.jwtComponent
                            .Configs['jwt.' + _config.Definition]
                            .callback(_config);

                          },
    loadApproveTemplate : function(config) {

                          var source = jwt.templates['ApproveTemplate'];
                          var templateC = jwt.handlebars.compile(source);
                          var outHTML = templateC(jwt.invoice);

                          jQuery("#popModal").html(outHTML);

                          config.callback(config);

                          jQuery("#image-now").css("width" ,"0%");
                          jQuery("#component-data").css("width" ,"90%");

                          jQuery(".modalDialog").css("opacity", "1");
                          jQuery(".modalDialog").css("pointer-events", "auto");

                          jQuery(".modalDialog > div").css("width", "70%");

                          jQuery("#modal-cancel, .approve-close").on("click", function() {
                             jQuery("#select2-drop-mask").click();
                            jQuery("#popModal").html("");
                            jQuery("#image-now").css("width" ,"50%");
                            jQuery("#component-data").css("width" ,"50%");
                            jQuery("#full-section , #quick-section").css('display', 'block');
                          });

                        },
    loadPopUp         : function(obj  ) {

                          if (obj.hasOwnProperty("template")) {
                            var template = obj.template,
                              subTemplate = jwt.Mustache.to_html(template, obj.view);
                            obj.subTemplate = subTemplate;
                          }

                          var template = jwt.templates['PopUp'],
                            outHTML = jwt.Mustache.to_html(template, obj);

                          jQuery("#popModal").html(outHTML);
                          jQuery(".modalDialog").css("opacity", "1");
                          jQuery(".modalDialog").css("pointer-events", "auto");

                          jQuery("#user-pop-up").off('.btn-ok , .btn-cancel, .close')
                            .off("hide").on("click", ".btn-ok , .btn-cancel, .close",
                              function(event) {
                                jQuery(this).addClass('modal-result');
                                if ( ! obj.hasOwnProperty("userCancel") ){
                                    jQuery("#user-pop-up").hide();
                                    jwt.jwtWorkList.reset_Tabs();
                                }
                                var result = jQuery(this);
                                obj.popCallback(result);
                              });
                    }
  }
}());
