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


require(moduleName String, doneCallback Function, failCallback Function) // in single quotes
	- Returns an object by the moduleName that is passed in.  It will NOT preload the module. It will return a deferred object. 

		@method require
		@param  String
		@return Deferred

require(moduleNamesArray Array, doneCallback function, failCallback function)
	- Returns an object with ModuleNames as the keys. It will NOT preload the module.

		@method require
		@param  Array
		@return Deferred

define(moduleName String, data String Object or Array)
	- defines module to be used later

		@method define
		@param  String
		@return Object or String

requireLocal(moduleName String)
	- returns module or null

		@method requireLocal
		@param  String
		@return Object or String

ModRewrite.baseUrl String
	- if set, it will prefix any non fully qulified URL

ModRewrite.addExtensionRule(extension String)
	- adds extension to possible extensions
		@method ModRewrite.addExtensionRule
		@param  String
		@return null

ModRewrite.addFileRule(rule String or RegEx, ModifyPath Function)
	- adds filerule
		@method ModRewrite.addFileRule
		@param  String or RegEx, Function
		@return null

ModRewrite.setExports(moduleId, exportName)
	- adds Export Rule
		@method ModRewrite.setExports
		@param  String, String
		@return null

Deferred
	- Returns Deferred Object
		@method Deferred
		@param  null
		@return Deferred

Ajax
	- Returns Ajax Object
		@method Ajax
		@param  Object
		@return Ajax Deferred

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

