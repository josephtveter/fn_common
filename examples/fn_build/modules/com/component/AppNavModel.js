var AppNavModel = function(dataModel)
{
	var self = this;
	var Screens = require("Screens");
	var PageHistory = require("com.component.PageHistory");
	var Transition = require("com.component.Transition");
    var JB = require("jbone");
    var Deferred = require("Deferred");
    var ko = require("ko");

	this.dataModel = dataModel;
	this.screenStatus = ko.observable("INIT");
	this.screenStack = [];
	this.pageHistory = new PageHistory();
    this.currentScreen;
	var transition = new Transition(this.pageHistory, this.screenStatus);

	var screens = new Screens();

    this.closeDialog = function(screenId, params)
    {
    	// log.log("AppNavModel.closeDialog: "+screenId);
        var screenObj = getScreenObj({screenId:screenId});
        if(screenObj.instance.isOpen())
        {
            transition.closeDialog({screenId: screenId}).done(function()
            {
                screenObj.instance.events.hide(params);
                
            });
        }
    };

	this.showScreen = function(screenId, data, transition, onCloseCallbackFn)
    {
    	// log.log("AppNavModel.showScreen: "+screenId);
        self.showWaitIndicator();
        var deferredResult = new Deferred();
        self.screenStatus("INIT_SCREEN");
        var params = {};
        data = data || {};
        params.screenId = screenId;
        params.data = data;
        params.transition = transition;
        params.onCloseCallbackFn = onCloseCallbackFn;
        loadView(params).done(function(screenObj)
        {
            loadInstanceComplete(screenObj).done(function(result)
            {
                deferredResult.resolve(result);
            });
        }).fail(function(errorObj)
        {
            deferredResult.reject(errorObj);
        });
        
        return deferredResult;
    };

    var loadView = function(params)
    {
    	// log.log("AppNavModel.loadView: "+params.screenId);
        var deferred = new Deferred();
        var screenObj = getScreenObj(params);
        if(screenObj)
        {
            self.screenStatus("LOADING_SCREEN");
            screenObj.data = params.data;
            screenObj.onCloseCallbackFn = params.onCloseCallbackFn;
            if(screenObj.loaded && screenObj.instance)
            {
                deferred.resolve(screenObj);
            }
            else
            {
                screenObj.loaderFn(self).done(function(result)
                {
                    deferred.resolve(result);
                }).fail(function(errorObj)
                {
                    deferred.reject(errorObj);
                });
            }
        }
        else
        {
            debugger;
        	log.warn("AppNavModel.loadView NO_SCREEN_OBJ: "+params.screenId);
            deferred.reject({errorType: "NO_SCREEN_OBJ"});
        }
            
        return deferred;
    };

    var getScreenObj = function(params)
    {
    	// log.log("AppNavModel.getScreenObj: "+params.screenId);
        var screenObj = screens[params.screenId];
        // transition
        if(params.transition)
            screenObj.transition = params.transition;

        return screenObj;
    };

    var loadInstanceComplete = function(newScreenObj)
    {
    	// log.log("AppNavModel.loadInstanceComplete: "+newScreenObj.screenId);
        var deferred = new Deferred();
        var instance = newScreenObj.instance;
        instance.onCloseCallbackFn = newScreenObj.onCloseCallbackFn;
        var controller = instance.controller;

        controller.clear();
        instance.events.beforeShow();
        self.screenStatus("LOADING_DATA");
        if(newScreenObj.data)
        {
            controller.setViewData(newScreenObj.data);
        }
        // instance.touch = new Touch(instance.screenId);
        instance.events.show();
        self.currentScreen = newScreenObj;
        self.screenStatus("TRANSITIONING");
        self.transition(newScreenObj).done(function(newScreenObj)
        {
            self.hideWaitIndicator(newScreenObj.screenId);
            instance.events.afterShow();
            deferred.resolve(newScreenObj);
            
        });
        return deferred;
    };

    this.transition = function(newScreenObj)
    {
    	// log.log("AppNavModel.transition: "+newScreenObj.screenId);
        var deferred = new Deferred();
        var lastScreen = null;
        var instance = newScreenObj.instance;
        if(!instance.dialog)
        {
            lastScreen = self.pageHistory.history[self.pageHistory.history.length-1];
        }
        else if(instance.dialog === true)
        {
            self.pageHistory.openDialog(newScreenObj);
        }
        else
        {
            self.screenStack.push(newScreenObj);
        }
        instance.controller.onBeforeTransition();
        transition.transition(newScreenObj, lastScreen).done(function(result)
        {
            deferred.resolve(result);
        });
        return deferred;
    };
    var waitIndicator = ko.observable(); 
    var waitIndicatorActive = false;
    var kmLoaderActive = true;
    this.showWaitIndicator = function(message, message2)
    {
    	// log.log("AppNavModel.showWaitIndicator: "+message);
        var deferred = new Deferred();
        if(waitIndicatorActive === false)
        {
            waitIndicatorActive = true;
            self.showScreen("WaitScreen", {message: message, message2: message2}).done(function(screenObj)
            {
                waitIndicator(screenObj);
            }).always(function(result){
                deferred.resolve(result);
            });
            if(kmLoaderActive)
            {
                JB("div.km-loader").css("display", "none");
                kmLoaderActive = false;
            }
        }
        else if(waitIndicator() && waitIndicator().instance)
        {
            if(message)
            {
                waitIndicator().instance.controller.message(message);
            }

            if(message2)
            {
                waitIndicator().instance.controller.message2(message2);
            }
            deferred.resolve();
        }
        else
        {
            deferred.resolve();
        }
        return deferred;
    };

    this.hideWaitIndicator = function(val)
    {
    	// log.log("AppNavModel.hideWaitIndicator");
        if(val !== "WaitScreen")
        {
            if(waitIndicator())
            {
                if( waitIndicator().instance.isOpen() )
                {
                    waitIndicator().instance.controller.closeDialogView();
                }
            }
            else
            {
                var sub = waitIndicator.subscribe(function(val)
                {
                    val.instance.controller.closeDialogView();
                    sub.dispose();
                });
            }
            
        }
        // else
        if(kmLoaderActive)
        {
            JB("div.km-loader").css("display", "none");
            kmLoaderActive = false;
        }
        waitIndicatorActive = false;
    };
};
module.exports = AppNavModel;
//# sourceURL=/modules/com/component/AppNavModel.js