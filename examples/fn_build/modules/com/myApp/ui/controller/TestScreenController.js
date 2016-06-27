var TestScreenController = function(navModel)
{
	var ko = require("ko");
	log.info("TestScreenController");
	var self = this;
	this.init(navModel);
	this.changeMe = ko.observable(true);

	window.setTimeout(function()
	{
         self.changeMe(false);
	}, 2000);

	this.gotoPage2 = function()
	{
		self.navModel.showScreen("Test2Screen");
	};
};
module.exports = TestScreenController;
//# sourceURL=/modules/com/myApp/ui/controller/TestScreenController.js