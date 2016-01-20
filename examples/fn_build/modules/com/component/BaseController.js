var Deferred = require("Deferred");
var BaseController = function()
{
    // obj.dataForClose = {};
    var self = this;
    var JB = require("jbone");
    var ko = require("ko");
    this.navModel = null;
    this.dataModel = null;
    this.i18n = null;

    this.visible = ko.observable(false);
    // this.touchEnd = ko.observable(null);
    this.dataForClose = null;
    this.pulling = ko.observable(false);
    this.currentPage = ko.observable("HOME");
    this.init = function(navModel)
    {
        self.navModel = navModel;
        self.dataModel = navModel.dataModel;
    };

    this.afterInit = function(){};

    this.setViewData = function(viewData)
    {
    };

    /**
     * The corresponding screen is about to show.  Descendants should override to know when this occurs.
     */
    this.onScreenBeforeShow = function()
    {
    };

    this.onBeforeTransition = function()
    {
    };
    
    this.onTransition = function()
    {
    };

    this.onAfterTransition = function()
    {
    };

    /**
     * The corresponding screen is appearing now.  Descendants should override to know when this occurs.
     */
    this.onScreenShow = function()
    {
    };
    
    /**
     * The corresponding screen is done appearing.  Descendants should override to know when this occurs.
     */
    this.onScreenAfterShow = function()
    {
    };
    
    /**
     * The corresponding screen is now hidden.  Descendants should override to know when this occurs.
     */
    this.onScreenHide = function()
    {
    };

    /**
     * Show the app wait indicator.
     * @param {String} [message] The message to show with the wait indicator.
     * @param {String} [message2] Optional secondary message in a smaller font.
     */
    this.showWaitIndicator = function(message, message2)
    {
        self.navModel.showWaitIndicator(message, message2);
    };

    this.hideWaitIndicator = function()
    {
        self.navModel.hideWaitIndicator();
    };

    this.closeDialogView = function(params)
    {
        self.navModel.closeDialog(self.screenId, params);
    };

    /**
     * Views can set the dom element ID of the view on the controller, allowing the controller to fire events back up to the view.
     * @param {Object} uiViewId The dom element ID of the view.
     */
    this.setUiViewId = function(uiViewId)
    {
        self.screenId = uiViewId;
    };

    this.getString = function(id)
    {
        var stringId = id;
        if(id.indexOf(".") === -1)
        {
            stringId = self.screenId+"."+id;
        }
        return this.dataModel.i18n.getString(stringId);
    };

    /**
     * This should be overriden by descendants to clear the data in a window before it is shown.
     */
    this.clear = function()
    {
        // noop
    };

    this.refreshScroller = function()
    {
        if(self.visible)
        {
            self.visible.valueHasMutated();
        }
        
        if(this.scrollers && this.scrollers.length > 0)
        {
            var len = this.scrollers.length;
            for(var i=0;i<len;i++)
            {
                this.scrollers[i].refresh();
            }
        }
    };

    /*
    * Call this if you change segmented control with a scroller. IOS will sometimes lose the listener.
    */
    this.resetTouchListeners = function() 
    {
        // Util.touches.destroyListeners(obj.screenId);
        // Util.touches.initListeners(obj.screenId);
        // window.setTimeout(Util.touches.reset, 100);
    };

    this.gotoMain = function()
    {
        this.navModel.showScreen("MainMenuScreen");
    };

    // Shake
    this.shake = function(targets, delay)
    {
        var deferred = new Deferred();
        delay = delay || 0;
        window.setTimeout(function()
        {
            JB(targets).addClass("shake");
            window.setTimeout(function()
            {
                JB(targets).removeClass("shake");
                deferred.resolve();
            }, 2000);
        }, delay * 1000);
        return deferred;
    };
};

module.exports = BaseController;
//# sourceURL=/modules/com/shout/html5/ui/controller/BaseController.js
