log.info("Loading TestModule");
var TestModule = function()
{
	log.info("TestModule");
	var self = this;
	var TestModule4 = require("modules/com/component/TestModule4");
	var testModule4 = new TestModule4();
	testModule4.myPublicFunction(true);
	
	var myPrivateVar = true;
	var myPrivateFunction = function(val)
	{
		log.info("TestModule myPrivateFunction val: {}", val);
		myPrivateVar = val;
	};

	this.myPublicVar = false;
	this.myPublicFunction = function(val)
	{
		log.info("TestModule.myPublicFunction val: {}", val);
		var same = false;
		self.myPublicVar = val;
		if(myPrivateVar === self.myPublicVar)
		{
			same = true;
		}
		else
		{
			myPrivateFunction(val);
		}
		return same;
	};

};
module.exports = TestModule;
// next line is to allow Browsers to find the file.
//# sourceURL=/modules/com/component/TestModule.js