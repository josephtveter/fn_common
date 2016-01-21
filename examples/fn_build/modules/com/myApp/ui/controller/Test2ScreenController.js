var Test2ScreenController = function(navModel)
{
	log.info("Test2ScreenController");
	var self = this;
	this.init(navModel);

	this.gotoPage1 = function()
	{
		self.navModel.showScreen("TestScreen");
	};

};
module.exports = Test2ScreenController;
//# sourceURL=/modules/com/myApp/ui/controller/Test2ScreenController.js