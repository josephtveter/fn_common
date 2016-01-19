log.info("Loading TestModule4");
var TestModule4 = function()
{
	log.info("TestModule4");
	var self = this;
	debugger;
	var stuff = requireLocal('stuff');

	var myPrivateVar = true;
	var myPrivateFunction = function(val)
	{
		log.info("TestModule4 myPrivateFunction val: {}", val);
		myPrivateVar = val;
	};

	this.myPublicVar = false;
	this.myPublicFunction = function(val)
	{
		log.info("TestModule4.myPublicFunction val: {}", val);
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
module.exports = TestModule4;
// next line is to allow Browsers to find the file.
//# sourceURL=/modules/com/component/TestModule4.js