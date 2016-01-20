
var screens = function()
{
	var ScreenNames = require("ScreenNames");
	var screenLoaderFactory = require("com.component.screenLoaderFactory");

    var screenNames = new ScreenNames();
    var screenList = {};
    screenList[screenNames.TEST2_SCREEN] = screenLoaderFactory(
    {
        moduleName: screenNames.TEST2_SCREEN,
        css: true
    });
    screenList[screenNames.TEST_SCREEN_ID] = screenLoaderFactory(
    {
        moduleName: screenNames.TEST_SCREEN_ID,
        css: true
    });
    // WAIT_SCREEN_ID
    screenList[screenNames.WAIT_SCREEN_ID] = screenLoaderFactory(
    {
        moduleName: screenNames.WAIT_SCREEN_ID,
        css: true,
        dialog: true
    });
	return screenList;	
};
module.exports = screens;
//# sourceURL=/modules/com/shout/html5/component/objects/screens.js