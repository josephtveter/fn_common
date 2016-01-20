// History 
// To be used before the transition but after the screen has been rendered.  This should be part of the transition phase, after the elemet has been prepared for the transition, or maybe after the trasition is completed.


var PageHistory = function()
{
	var ko = require("ko");
	var self = this;
	var settingHash = false;
	this.history = [];
	this.openDialog = ko.observable();
	this.setLocation = function(screenObj)
	{
		if(!screenObj.dialog)
		{
			settingHash = true;
			location.hash = "#"+screenObj.screenId;
			self.history.push(screenObj);
		}
	};

	window.addEventListener('popstate', function(event) // TODO tie to androind back and detect forward
	{
		if(settingHash)
		{
			settingHash = false;
		}
		else if(self.history.length > 1)
		{
			window.setTimeout(function()
			{
				var screenObj = self.history[self.history.length-2];
				var screenId = screenObj.screenId;
				var data = screenObj.data;
				var transition = screenObj.transition;
				var onCloseCallbackFn = screenObj.onCloseCallbackFn;
				// TODO no more trigger handelers
				// $(document).trigger("app.showScreen", {screenId: screenId, data: data, transition: transition, onCloseCallbackFn: onCloseCallbackFn});
			}, 1);
		}
		
	    // alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
	});
};
module.exports = PageHistory;