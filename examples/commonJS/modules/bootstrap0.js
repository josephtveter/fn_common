/*
*	There are two ways that you can use the require method.
*
* 	1. You can give it an array of module names, and it will return a deferred object. The done Function can be passed in as a second argument, or you can use the done function of the deferred object. Either will return an object that has the modules, with the module names as keys.  The third argument of require registers the fail function.
*
* 	2. If you pass a string in double quotes it will return a deferred object, which will be given the module when resolved.
*
*/

//	1. require
require(['modules/com/component/TestModule', 'modules/com/component/TestModule2', 'modules/com/component/TestModule3'], function(mods) // Done Function
{
	log.info("require 1 done as argument 2: TestModules are Loaded");
}, function(errorObj) // Fail Function
{
	log.info("require 1 fail as argument 3: TestModules are not Loaded");
});

//	2. require - preloads the module (must use double quotes to preload)
var TestModule4 = require("modules/com/component/TestModule4");
if(TestModule4)
{
	log.info("require 2: TestModule4 is Loaded");
}

// define stores objects for later that you you can require. 
define("stuff", {junk: {foo:"bar", arr:[1,2,3]}});

// Use requireLocal to retrieve objects that you have stored with define.  
var stuff = requireLocal("stuff");
log.info("Here is stuff: {}", stuff);
	
// next line is to allow Browsers to find the file.
//# sourceURL=/modules/bootstrap0.js


