FN_CommonJS

FN_CommonJS is a dependency Management loader built to the Common JS Spec
http://wiki.commonjs.org/wiki/CommonJS

Inclueded in the FN_CommonJS library are 2 dependencies an Ajax library, and a Deferred Promise Library

The Ajax Library is patterned after Jquery
http://api.jquery.com/jquery.ajax/

The Deferred Library is patterned after Promise/A and Jquery
https://promisesaplus.com/


Setup

- Place the FN_Common.js or the FN_Common.min.js file in your library directory I prefer "/modules/libs". Your bootstrap file is the first file to be loaded that will handle the script execution of your site.  Place this line in your HTML file to load the bootstrap and FN_Common.

<script type="text/javascript" data-main="PATH_TO_bootstrap" src="PATH_TO_FN_Common"></script>

Here is an example:

<script type="text/javascript" data-main="modules/bootstrap" src="modules/libs/FN_Common.js"></script>


API
		 
require(moduleName String) // in doubble quotes
	- Returns an object by the moduleName that is passed in.  When doubble quotes are used it will attempt to preload the file so it can return the file upon execution.  

		@method require
		@param  String
		@return Object or String

	Example:

		var myModule = require("myPathToModule/myModuleName");

require(moduleNamesArray Array, doneCallback function, failCallback function)
	- Returns an object with ModuleNames as the keys. It will NOT preload the module.

		@method require
		@param  Array
		@return Deferred

	Example:

		require(["myModule1", "myModule2"], function(modules) // First arguement is an array of module names, Second Arguement is the done function
		{
			var myModule1 = modules["myModule1"];
			var myModule2 = modules["myModule2"];
		}, function(errorObj) // Third Arguement is the fail function
		{
			log.warn("Modules Failed to load: {}", errorObj);
		});

define(moduleName String, data String Object or Array)
	- defines module to be used later

		@method define
		@param  String
		@return Object or String

	Example:
	
		define("stuff", {foo:"bar"});

requireLocal(moduleName String)
	- returns module or null, use if you want exeplitcitly what is currently in memory

		@method requireLocal
		@param  String
		@return Object or String

	Example:

		var stuff = requireLocal("stuff");

ModRewrite.baseUrl String
	- if set, it will prefix any non fully qulified URL

	Example:

		ModRewrite.baseUrl = "modules";

ModRewrite.addExtensionRule(extension String)
	- adds extension to possible extensions
		@method ModRewrite.addExtensionRule
		@param  String
		@return null

	Example:

		ModRewrite.addExtensionRule("json");

ModRewrite.addFileRule(rule String or RegEx, ModifyPath Function)
	- adds filerule
		@method ModRewrite.addFileRule
		@param  String or RegEx, Function
		@return null

	Example:

		ModRewrite.addFileRule("jquery", function(path)
		{
			return "libs/jquery.2.0";
		});

ModRewrite.setExports(moduleId, exportName)
	- adds Export Rule
		@method ModRewrite.setExports
		@param  String, String
		@return null

	Example:
		ModRewrite.setExports("jquery", "jquery");


Deferred
	- Returns Deferred Object
		@method Deferred
		@param  null
		@return Deferred

	Example:

		var deferred = new Deferred; // instanciate the object

		var successFun = function(result) // Success Function
		{
			log.info("Success Function: {}", result);
		};

		var failureFun = function(errorObj) // Failure Function
		{
			log.warn("Failure Function: {}", errorObj);
		};

		var doneFun = function(result) // Done Function
		{
			log.info("Done Function: {}", result);
		};

		var failFun = function(errorObj) // Fail Function
		{
			log.warn("Fail Function: {}", errorObj);
		};

		var alwaysFun = function(result) // Always Function
		{
			log.log("Always Function: {}", result);
			var status = deferred.status();
			log.log("Always Function status: {}", status);
			var isRejected = deferred.isRejected();
			log.log("Always Function isRejected: {}", isRejected);
			var isResolved = deferred.isResolved();
			log.log("Always Function isResolved: {}", isResolved);
			var state = deferred.state;
			log.log("Always Function state: {}", state);
			var value = deferred.value;
			log.log("Always Function value: {}", value);
		};

		deferred.then(successFun, failureFun); // Promise/A then method accepts functions
		deferred.done(doneFun); // Jquery like done method accepts functions
		deferred.fail(failFun); // Jquery like fail method accepts functions
		deferred.always(alwaysFun); // Jquery like method accepts functions

		window.setTimeout(function()
		{
			// Comment in the action you would like. If both are commented in the first will take precedence.
			deferred.resolve({stuff: "Junk"}); 
			// deferred.reject({errorType: "GENERAL_ERROR"});
		}, 1000);


Ajax
	- Returns Ajax Object
		@method Ajax
		@param  Object
		@return Ajax Deferred

	Example:

		var URL = "https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.2/TweenMax.min.js"; // Greensock url, no reason I just like Greensock
		ajax({url: URL}).done(function(result)
		{
			log.info("File Loaded");
		}).fail(function(errorObj)
		{
			log.warn("File Not Loaded: {}", errorObj);
		});

log
	log.logLevel
		- int to set maximum logging
	log.logOnly
		- int to set log to only one type of log
	log.trace(log String, Obj object)
		- sends trace to console
	log.log(log String, Obj object)
		- sends log to console
	log.info(log String, Obj object)
		- sends info to console
	log.warn(log String, Obj object)
		- sends warn to console
	log.error(log String, Obj object)
		- sends error to console


Examples
- You may want to start with the log example to help debugging
- The commonJS example will show you the methods of the CommonJS Library
- The deferred example will show how you can use the deferred objects
- The ajax example will show you the methods of the Ajax library 

