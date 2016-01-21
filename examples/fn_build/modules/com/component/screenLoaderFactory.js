var ShoutScreen = require("com.component.ShoutScreen");
var JB = require("jbone");
var Deferred = require("Deferred");
var BaseController = require("com.component.BaseController");
var attachCSS = function(txt, elId)
{
    txt = txt || "";
    txt = txt.replace(/^\s+|\s+$/gm,""); // Trim the start and end of each line.
    txt = txt.replace(/\r?\n|\r/g, " "); // Replace line feed chars with spaces.
    var count = document.getElementsByTagName('style').length;
    elId = elId || count;
    var style = document.createElement('style');
    style.id = "stylesheet_"+elId || "stylesheet_"+count;
    style.type = 'text/css';
    var useCssText = (style.styleSheet) ? true : false;
    
    if (useCssText) {
        style.styleSheet.cssText = txt;
    }
    else {
        style.appendChild(document.createTextNode(txt));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
};
var screenLoaderFactory = function(params)
{
    params = params || {};

    return {
        screenId: params.moduleName,
        loaded: false,
        dialog: params.dialog,
        transition: params.transition,
        androidBack: params.androidBack || null,
        loaderFn: function(navModel)
        {
            this.navModel = navModel;
            var appName = requireLocal("appName");
            var self = this;
            var deferredResult = new Deferred();
            var controllerModule = "com."+appName+".ui.controller." + params.moduleName + "Controller"; // TODO SET IN bootstrap

            var templateModule = "html!com."+appName+".ui.template." + params.moduleName; // TODO SET IN bootstrap
            var newScreenObj = this;
            var dependencies = [controllerModule, templateModule];

            var cssModule;
            if (params.css === true)
            {
                cssModule = "css!com."+appName+".ui.css." + params.moduleName; // TODO SET IN bootstrap
                dependencies[dependencies.length] = cssModule;
            }
            require(dependencies, function(mods)
            {
                if(cssModule)
                {
                    var css = mods[cssModule];
                    // TODO CHECK IF SKIP
                    var skip = css.indexOf("--SKIP--") !== -1 ? true : false;

                    if(!skip)
                    {
                        attachCSS(css, params.moduleName);
                    }
                }

                var Controller = mods[controllerModule];
                Controller.prototype = new BaseController();
                var controller = new Controller(self.navModel);
                controller.afterInit();
                var template = mods[templateModule];
                var instance = new ShoutScreen(
                {
                    screenId: params.moduleName,
                    template: template,
                    controller: controller,
                    dialog: params.dialog,
                    androidBack: params.androidBack || null,
                    resetFn: function()
                    {
                        controller.clear();
                    }
                });
                
                if (!JB("#" + instance.screenId).length)
                {
                    instance.renderScreen();
                }
                newScreenObj.loaded = true;
                
                newScreenObj.instance = instance;
                deferredResult.resolve(newScreenObj);
            });
            return deferredResult;
        }
    };
};
module.exports = screenLoaderFactory;