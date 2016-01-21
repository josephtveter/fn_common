var TestScreenController = function(navModel)
{
	log.info("TestScreenController");
	var self = this;
	this.init(navModel);

	this.gotoPage2 = function()
	{
		self.navModel.showScreen("Test2Screen");
	};
};
module.exports = TestScreenController;
//# sourceURL=/modules/com/myApp/ui/controller/TestScreenController.js