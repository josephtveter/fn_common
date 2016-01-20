var Transition = function(pageHistory, screenStatus)
{
	var JB = require("jbone");
	var Deferred = require("Deferred");
	var self = this;
	this.pageHistory = pageHistory;
	var default_time = 0.4;
    self.screenStatus = screenStatus;

    var TweenMax = {};
	TweenMax.fromTo = function(id, time, transition, callback)
	{
		// log.log("Transition fromTo");
		time = time || default_time;
		transition = transition || "fadeIn";
		if(id)
		{
			JB(id).addClass(transition);
			window.setTimeout(function()
			{
				if(callback && typeof(callback) === "function")
				{
					callback();
					JB(id).removeClass(transition);
				}
			}, 450);
		}
		else if(callback && typeof(callback) === "function")
		{
			callback();
		}
	};

	this.transition = function(toScreen, fromScreen)
	{
		// log.log("Transition.transition");
		var deferred = new Deferred();
		var time = toScreen.transitionTime || default_time;
		var controller = toScreen.instance.controller;
    
        JB("#"+toScreen.screenId).removeAttr("style");
        
        if(window.noFlex)
        {
        	JB("#"+toScreen.screenId).css("display", "block");
        }
        if(fromScreen)
        {
        	JB("#"+fromScreen.screenId).removeAttr("style");
        }

        var resolve = function()
        {
        	// log.log("Transition.transition resolve");
        	controller.onAfterTransition();
	        	
        	if(!toScreen.dialog)
        	{
            	self.pageHistory.setLocation(toScreen);
        		if(window.noFlex)
				{
					var shortBody = JB("body").hasClass("short");
					var rem = parseInt(window.getComputedStyle(document.body, null).getPropertyValue('font-size'));
					var headerH = 4.5 * rem;
					var footerH = shortBody ? 3.5 * rem : 5 * rem;
					var appHeight = document.body.clientHeight || document.body.scrollHeight || document.getElementById("shoutWrapper").clientHeight;
					var pageContent = JB("#"+toScreen.screenId+" .pageContent");
					var contentH = appHeight - headerH - footerH;
					// pageContent.height(contentH);
					pageContent.css("height", contentH+"px");
					// log.info("contentH: "+contentH);
				}
        	}
        	deferred.resolve(toScreen);
        };

        var resolveHide = function()
        {
        	// log.log("Transition.transition hide");
        	var disable = true;
        	if(fromScreen && fromScreen.screenId !== toScreen.screenId)
        	{
        		JB("#"+fromScreen.screenId).addClass("hideScreen");
        		disable = false;
        	}
        	if(window.noFlex)
        	{
        		JB("#"+fromScreen.screenId).css("display", "none");
        	}
        	
        	fromScreen.instance.events.hide(disable);
        };

		controller.onTransition();
		
		if(fromScreen)
		{
			TweenMax.fromTo("#"+fromScreen.screenId, time, "fadeOut", resolveHide);
		}
		JB("#"+toScreen.screenId).removeClass("hideScreen");
		TweenMax.fromTo("#"+toScreen.screenId, time, "fadeIn", resolve);
			
		return deferred;
	};

	var closeComplete = function(screenId)
	{
		// log.log("Transition.closeComplete");
		JB("#"+screenId).addClass("hideScreen");
		JB("#"+screenId).removeAttr("style");
    	pageHistory.openDialog(null);
        self.screenStatus("SCREEN_COMPLETE");
	};

	this.closeDialog = function(data)
	{
		// log.log("Transition.closeDialog");
        var deferred = new Deferred();
		var screenId = data.screenId;
		var time = data.time || default_time;
		var transition = data.transition || "DEFAULT";
		switch(transition)
		{
	        default:
	        TweenMax.fromTo("#"+screenId, time, "fadeOut", function()
	        {
	        	closeComplete(screenId);
                deferred.resolve();
	        });
	        break;
		}
		return deferred;
	};
};

module.exports = Transition;