log.info("Loading TestModule2");
var TestModule2 = function()
{
	log.info("TestModule2");
	var self = this;
	var myPrivateVar = true;
	var myPrivateFunction = function(val)
	{
		log.info("TestModule2 myPrivateFunction val: {}", val);
		myPrivateVar = val;
	};

	this.myPublicVar = false;
	this.myPublicFunction = function(val)
	{
		log.info("TestModule2.myPublicFunction val: {}", val);
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
module.exports = TestModule2;
// next line is to allow Browsers to find the file.
//# sourceURL=/modules/com/component/TestModule2.js