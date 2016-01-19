/*
* Deferred example 
*
* This library is baesed off of Promise/A  - https://promisesaplus.com/ and made to closely resemble Jquery Deferred for easy replacement of Jquery Deferred - https://api.jquery.com/jquery.deferred/
*/
debugger;
var Deferred = require("Deferred"); // Require the library with commonJS Require statement

var deferred = new Deferred; // instanciate the object

var successFun = function(result) // Success Function
{
	log.info("Success Function: {}", result);
	debugger;
};

var failureFun = function(errorObj) // Failure Function
{
	log.warn("Failure Function: {}", errorObj);
	debugger;
};

var doneFun = function(result) // Done Function
{
	log.info("Done Function: {}", result);
	debugger;
};

var failFun = function(errorObj) // Fail Function
{
	log.warn("Fail Function: {}", errorObj);
	debugger;
};

var alwaysFun = function(result) // Always Function
{
	debugger;
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
	debugger;
};
debugger;

// deferred.then(successFun, failureFun); // Promise/A then method accepts functions
// deferred.done(doneFun); // Jquery like done method accepts functions
// deferred.fail(failFun); // Jquery like fail method accepts functions
// deferred.always(alwaysFun); // Jquery like method accepts functions

deferred.then(successFun, failureFun).done(doneFun).fail(failFun).always(alwaysFun); // You can chain the methods together such as is common with Jquery

window.setTimeout(function()
{
	// Comment in the action you would like. If both are commented in the first will take precedence.
	deferred.resolve({stuff: "Junk"}); 
	// deferred.reject({errorType: "GENERAL_ERROR"});
}, 1000);


var myFunction = function()
{
	var myDeferred = new Deferred();
	window.setTimeout(function()
	{
    	myDeferred.resolve("ItIsDone");
	}, 1000);
	return myDeferred; // you may also return myDeferred.promise() to make replacing Jquery easier.
};

myFunction().done(function(result)
{
	log.log("myFunction resolved: {}", result);
});


