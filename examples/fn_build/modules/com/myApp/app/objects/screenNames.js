var screenNames = function(obj)
{
	obj = obj || {};
    obj.WAIT_SCREEN_ID = "WaitScreen";
    obj.TEST_SCREEN_ID = "TestScreen";
    obj.TEST2_SCREEN_ID = "Test2Screen";

	return obj;
};
module.exports = screenNames;