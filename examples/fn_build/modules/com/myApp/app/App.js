var App = function()
{
    var self = this;
    var AppDataModel = require("com.myApp.app.AppDataModel");
    var AppNavModel = require("AppNavModel");
    var Touches = require("com.component.Touches");
    var JB = require("jbone"); // jquery DOM replacement
    var ScreenNames = require("ScreenNames");
    var screenNames = new ScreenNames();
    window.touches = new Touches();
    log.info("App");
   
    this.dataModel = new AppDataModel();
    this.navModel = new AppNavModel(this.dataModel);
    var isFlexSupported = function()
    {
        var supported = true;
        var isPropertySupported = function(property)
        {
            var found = false;
            var prefix = ["", "-webkit-", "-moz-", "-o-"];
            if(document.body.style)
            {
                for(var i=0;i<prefix.length;i++)
                {
                    if(document.body.style[prefix[i]+property] || document.body.style[prefix[i]+property] === "")
                    {
                        found = true;
                        break;
                    }
                }
            }
            return found;
        };

        if(!isPropertySupported("flex"))
        {
            supported = false;
        }
        return supported;
    };

    var showScreen = function(screenId, data, transition, onCloseCallbackFn)
    {
        log.warn("App.showScreen");
        self.navModel.showScreen(screenId, data, transition, onCloseCallbackFn);
    };

    this.epicFail = function(errorObj)
    {
        log.warn("App.epicFail {}", errorObj);
        switch(errorObj.errorType)
        {
            default:
                showScreen("ErrorScreen", {message: "There was a network error. Please try again later."});
                // epicFail(errorObj);
            break;
        }
    };

    this.stopScroll = function(e)
    {
        window.touches.stopScroll(e);
    };

    this.init = function(data)
    {
        log.info("App.init");
        var systemDetect = self.dataModel.systemDetect;

        if(data.koWindowSize)
        {
            data.koWindowSize.subscribe(function(val)
            {
                self.dataModel.windowsize = val;
                if(val && systemDetect.mobileDevice)
                {
                    log.info("App.init windowSize: {}", val);
                    if(val.layout === "Portrait")
                    {
                        if(val.aspectRatio <= 1.5)
                        {
                            JB("body").addClass("short");
                        }
                        else if(val.aspectRatio > 1.6)
                        {
                            // JB("body").addClass("tall");
                        }
                    }   
                }
            });
            data.koWindowSize.valueHasMutated();
        }
        if(systemDetect.FBAN)
        {
            JB("body").addClass("FBAN");
        }
        if(systemDetect.FBAV)
        {
            JB("body").addClass("FBAV");
        }

        if(systemDetect.twitter === true)
        {
            JB("body").addClass("twitterForIphone");
        }
        else
        {
            log.info("App.init NOT twitterForIphone");
        }
        if(!systemDetect.mobileDevice)
        {
            JB("body").addClass("desktop");
        }
        else
        {
            JB("body").addClass(systemDetect.mobileDevice);
        }
        if(systemDetect.browser)
        {
            var browserClass = systemDetect.browser;
            if(systemDetect.version)
            {
                browserClass += systemDetect.version;
            }
            JB("body").addClass(browserClass);
        }
        if(!isFlexSupported()) 
        {
            JB("body").addClass("noFlex");
            window.noFlex = true;
        }
        log.log("App classes: "+JB("body").attr("class"));
        showScreen(screenNames.TEST_SCREEN_ID);    
    };
    document.onkeydown = function(e)
    {
        var rem = parseInt(window.getComputedStyle(document.body, null).getPropertyValue('font-size'));
        e = e || window.event;
        var scrollers = null; 
        if(self.navModel.currentScreen)
        {
            scrollers = self.navModel.currentScreen.instance.controller.scrollers;
            if (e.keyCode == 38)
            {
                scrollers[0].scrollBy(0, -rem);
            }
            else if(e.keyCode == 40)
            {
                scrollers[0].scrollBy(0, rem);
            }
        }
    };
};
module.exports = App;
//# sourceURL=/modules/com/vote/app/App.js