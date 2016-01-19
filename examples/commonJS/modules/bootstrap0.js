debugger;
define("stuff", {foo: "bar"});

require(['modules/com/component/TestModule', 'modules/com/component/TestModule2', 'modules/com/component/TestModule3']).done(function(mods)
{
	debugger;
})

require('modules/com/component/TestModule').done(function(mod)
{
	//here
	debugger;
});

require(['modules/com/component/TestModule2', 'modules/com/component/TestModule3'], function(modsArr)
{
	debugger;
	var testModule2 = new modsArr['modules/com/component/TestModule2']();
	testModule2.myPublicFunction(true);
	var testModule3 = new modsArr['modules/com/component/TestModule3']();
	testModule3.myPublicFunction(false);
	debugger;
}, function(errorObj)
{
	debugger;
});


	
// next line is to allow Browsers to find the file.
//# sourceURL=/modules/bootstrap.js
