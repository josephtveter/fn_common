log.info("Loading TestModule3");
var TestModule3 = function()
{
	log.info("TestModule3");
	var self = this;
	var myPrivateVar = true;
	var myPrivateFunction = function(val)
	{
		log.info("TestModule3 myPrivateFunction val: {}", val);
		myPrivateVar = val;
	};

	this.myPublicVar = false;
	this.myPublicFunction = function(val)
	{
		log.info("TestModule3.myPublicFunction val: {}", val);
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
module.exports = TestModule3;
// next line is to allow Browsers to find the file.
//# sourceURL=/modules/com/component/TestModule3.js