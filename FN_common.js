// DEPENDENCIES
/* Changed 1/15/2016
/* Start docReady */
(function(funcName, baseObj) {
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;
    function ready() {
        if (!readyFired) {
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            readyList = [];
        }
    }
    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }
    baseObj[funcName] = function(callback, context) {
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            readyList.push({fn: callback, ctx: context});
        }
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", ready, false);
                window.addEventListener("load", ready, false);
            } else {
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    };
})("docReady", window);
/* End docReady */

/* Start Log */
var FN_Log = function(logLevel)
{
	var self = this;
	var LogglyTracker = null;
	this.initLoggly = function(key, tracker)
	{
		LogglyTracker = tracker;
		if(tracker)
		{
			LogglyTracker.push({logglyKey: key});
		}
	};
	var format = function(msg)
	{
	    var result = null;
	    var numArgs = arguments.length - 1;
	    var iterCount = 0;
	    var outerArgs = arguments;

	    if (numArgs === 0 )
	    {
	        result = msg;
	    }
	    else if(msg)
	    {
	        result = msg.replace(/(\{\})/g, function ()
	        {
	            var result2 = "{}";
	            if (iterCount < numArgs)
	            {
	                var obj = outerArgs[iterCount + 1];
	                try
	                {
	                    result2 = (obj !== undefined && obj !== null && 'object' === typeof(obj)) ? JSON.stringify(obj) : (obj === undefined || obj === null ? "<null>" : obj.toString());
	                }
	                catch(ex)
	                {
	                    result = obj;
	                }
	                iterCount++;
	            }
	            return result2;
	        });
	    }
	    
	    return result;
	};

	this.logLevel = logLevel || 0;
	this.EXPORT_LOG = true;
	var LOG_TRACE = 50;
	var LOG_LOG = 40;
	var LOG_INFO = 30;
	var LOG_WARN = 20;
	var LOG_ERROR = 10;
	var LOG_SILENT = 0;

	this.nullLogger = function(){};

	var logDiv = null;
	var checkLogDiv = function(log, type)
	{
		if(!logDiv)
		{
			logDiv = document.getElementById("logDiv");
			// logDiv.style.display = 'block';
		}
		if(logDiv)
		{

			logDiv.innerHTML += '<div class="'+type+'Log">'+log+'</div>';
		}
	};

	this.traceLoggerPlus = function(val)
	{
	    if (self.logLevel >= LOG_TRACE)
	    {
	        console.trace(val);
	        checkLogDiv(val, "trace");
	    }
	};

	this.logLoggerPlus = function(val)
	{
	    if (self.logLevel >= LOG_LOG)
	    {
	        console.log(val);
	        checkLogDiv(val, "log");
	    }
	};


	this.infoLoggerPlus = function(val)
	{
	    if (self.logLevel >= LOG_INFO)
	    {
	        console.info(val);
	        checkLogDiv(val, "info");
	    }
	};

	this.warnLoggerPlus = function(val)
	{
	    if(self.logLevel >= LOG_WARN)
	    {
	        console.warn(val);
	        checkLogDiv(val, "warn");
	       	if(self.EXPORT_LOG && LogglyTracker)
	        {
	            LogglyTracker.push({warn: {log: val, platformInfo: self.platformInfo}});
	        }
	    }
	};

	this.errorLoggerPlus = function(val)
	{
	    if(self.logLevel >= LOG_ERROR)
	    {
	        console.error(val);
	        checkLogDiv(val, "error");
	       	if(self.EXPORT_LOG && LogglyTracker)
	        {
	            LogglyTracker.push({error: {log: val, platformInfo: self.platformInfo}});
	        }
	    }  
	};



	// this.warnLoggerPlus = function(val)
	// {
	// 	debugger;
	//     if(self.logLevel >= LOG_WARN)
	//     {
	//         console.warn(val);
	//     }
	// };

	// this.errorLoggerPlus = function(val)
	// {
	//     if(self.logLevel >= LOG_ERROR)
	//     {
	//         console.error(val);
	//     }  
	// };

	window.onerror = function(message, file, line, relLine, errorObj)
	{
		var error = {message: message, file: file, line: line, relLine: relLine};
		self.warn("FN_Log onerror: {}", error);
	};
	this.handleCatch = function(e, message)
	{
		e = e || {};
		message = message || "";
		message += " -- ErrorMessage " + e.message;
		if(e.stack)
		{
			message += e.stack.split("\n")[1];
			var str = e.stack.toString();
			var idx = str.lastIndexOf(":")+1;
			var line = str.substring(idx);
			message += " -- Line " + line;
		}
		self.warn(message);
	};
	this.trace = function(val, var2, var3)
	{
        var args = Array.prototype.slice.call(arguments);
        self.traceLogger(format.apply(this, args));
	};

	this.log = function()
	{
		var args = Array.prototype.slice.call(arguments);
        self.logLogger(format.apply(this, args));
	};

	this.info = function(val)
	{
        var args = Array.prototype.slice.call(arguments);
        self.infoLogger(format.apply(this, args));
	};

	this.warn = function()
	{
        var args = Array.prototype.slice.call(arguments);
        self.warnLogger(format.apply(this, args));
	};

	this.error = function()
	{
        var args = Array.prototype.slice.call(arguments);
        self.errorLogger(format.apply(this, args));
	};

	this.debugLogger = this.log;
	this.traceLogger = this.log;
	this.infoLogger = this.log;
	this.warnLogger = this.log;
	this.errorLogger = this.log;


	if (!console || !console.log || this.logLevel === LOG_SILENT)
    {
        this.log = this.nullLogger;
        this.trace = this.nullLogger;
        this.info = this.nullLogger;
        this.warn = this.nullLogger;
        this.error = this.nullLogger;
    }
    else
    {
        if (console.trace)
            this.traceLogger = this.traceLoggerPlus;
        
        if (console.log)
            this.logLogger = this.logLoggerPlus;

        if (console.info)
            this.infoLogger = this.infoLoggerPlus;
        
        if (console.warn)
            this.warnLogger = this.warnLoggerPlus;
        
        if (console.error)
            this.errorLogger = this.errorLoggerPlus;
    }
};

if ( typeof exports !== "undefined" ) {
    module.exports = FN_Log;
}
else if ( typeof define === "function" ) {
    define( function () {
        return FN_Log;
    } );
}
else {
    window.FN_Log = FN_Log;
}
var log = new FN_Log(40);
/* End Log */

/* Start Deferred */
	var Deferred = function()
	{
		var self = this;
		this.onDone = [];
		this.onAlways = [];
		this.onFail = [];
		this.state = Deferred.state.PENDING;

		this.promise = function ( arg ) {
			return self;
		};

		/**
		 * Registers a function to execute after Promise is reconciled
		 *
		 * @method always
		 * @param  {Function} arg Function to execute
		 * @return {Object}       Deferred instance
		 */
		this.always = function ( arg ) {
			if ( typeof arg == "function" ) {
				if(self.state !== Deferred.state.PENDING)
				{
					delay(arg(self.value, self.isResolved()));
				}
				self.onAlways.push( arg );
			}
			return self;
		};

		/**
		 * Registers a function to execute after Promise is resolved
		 *
		 * @method done
		 * @param  {Function} arg Function to execute
		 * @return {Object}       Deferred instance
		 */
		this.done = function ( arg ) {
			if ( typeof arg == "function" ) {
				if(self.state === Deferred.state.SUCCESS)
				{
					delay(arg(self.value, true));
				}
				self.onDone.push( arg );
			}
			return self;
		};

		/**
		 * Registers a function to execute after Promise is rejected
		 *
		 * @method fail
		 * @param  {Function} arg Function to execute
		 * @return {Object}       Deferred instance
		 */
		self.fail = function ( arg ) {
			if ( typeof arg == "function" ) {
				if(self.state === Deferred.state.FAILURE)
				{
					delay(arg(self.value, false));
				}
				self.onFail.push( arg );
			}
			return this;
		};

		/**
		 * Determines if Deferred is rejected
		 *
		 * @method isRejected
		 * @return {Boolean} `true` if rejected
		 */
		this.isRejected = function () {
			return ( self.state === Deferred.state.FAILURE );
		};

		/**
		 * Determines if Deferred is resolved
		 *
		 * @method isResolved
		 * @return {Boolean} `true` if resolved
		 */
		this.isResolved = function () {
			return ( self.state === Deferred.state.SUCCESS );
		};

		/**
		 * Rejects the Promise
		 *
		 * @method reject
		 * @param  {Mixed} arg Rejection outcome
		 * @return {Object}    Deferred instance
		 */
		this.reject = function ( arg ) {
			if ( self.state > Deferred.state.PENDING ) {
				return self;
			}

			self.value = arg;
			self.state = Deferred.state.FAILURE;
			self.process();
			return self;
		};

		/**
		 * Resolves the Promise
		 *
		 * @method resolve
		 * @param  {Mixed} arg Resolution outcome
		 * @return {Object}    Deferred instance
		 */
		this.resolve = function ( arg ) {
			if ( self.state > Deferred.state.PENDING ) {
				return self;
			}
			self.value = arg;
			self.state = Deferred.state.SUCCESS;
			self.process(arg);
			return self;
		};

		/**
		 * Gets the state of the Promise
		 *
		 * @method state
		 * @return {String} Describes the status
		 */
		this.status = function () {
			var state = self.state;
			var rtn = Deferred.status[state];
			
			return rtn;
		};

		/**
		 * Registers handler(s) for the Promise
		 *
		 * @method then
		 * @param  {Function} success Executed when/if promise is resolved
		 * @param  {Function} failure [Optional] Executed when/if promise is broken
		 * @return {Object}           New Promise instance
		 */
		this.then = function ( onFulfilled, onRejected ) {
			self.done( onFulfilled );
			self.fail( onRejected );
			return self;
		};

		/**
		 * Processes `handlers` queue
		 *
		 * @method process
		 * @return {Object} Promise instance
		 */
		this.process = function(arg) {
			var success, value;

			if ( self.state === Deferred.state.PENDING ) {
				return self;
			}

			value   = self.value || arg;
			success = self.state === Deferred.state.SUCCESS;

			if(self.state === Deferred.state.SUCCESS)
			{
				var doneLen = self.onDone.length;
				for(var d=0;d<doneLen;d++)
				{
					try 
					{
						self.onDone[d](value, success);
					}
					catch(e)
					{
						log.handleCatch(e, "Deferred onDone Fail");
					}
				}
			}
				
			if(self.state === Deferred.state.FAILURE)
			{
				var failLen = self.onFail.length;
				for(var f=0;f<failLen;f++)
				{
					try 
					{
						self.onFail[f](value, success);
					}
					catch(e)
					{
						log.handleCatch(e, "Deferred onFail Fail");
					}
				}
			}

			var allLen = self.onAlways.length;
			for(var a=0;a<allLen;a++)
			{
				
				try 
				{
					self.onAlways[a](value, success);
				}
				catch(e)
				{
					log.handleCatch(e, "Deferred onAlways Fail");
				}
			}

			return self;
		};

	};// END

	/**
	 * Accepts Deferreds or Promises as arguments or an Array
	 *
	 * @method when
	 * @return {Object} Deferred instance
	 */
	Deferred.when = function () {
		var i     = 0,
		    defer = new Deferred(),
		    args  = [].slice.call( arguments ),
		    nth,
		    callback = null;

		// Did we receive an Array? if so it overrides any other arguments
		if ( args[0] instanceof Array ) {
			args = args[0];
		}
		if( typeof arguments[1] === "function")
		{
			callback = arguments[1];
		}

		// How many instances to observe?
		nth = args.length;

		// None, end on next tick
		if ( nth === 0 ) {
			defer.resolve( null );
		}
		// Setup and wait
		else {
			each( args, function ( p ) {
				p.then( function () {
					if ( ++i === nth && !defer.isResolved() ) {
						if ( args.length > 1 ) {
							defer.resolve( args.map( function ( obj ) {
								return obj.value;
							} ) );
							if ( callback ) {
							callback(args.map( function ( obj ) {
									return obj.value;
								} ));
							}
							
						}
						else {
							defer.resolve( args[0].value );
							if ( callback ) {
							callback( args[0].value );
							}
						}
					}
				}, function () {
					if ( !defer.isResolved() ) {
						if ( args.length > 1 ) {
							defer.reject( args.map( function ( obj ) {
								return obj.value;
							} ) );
							if ( callback ) {
							callback(args.map( function ( obj ) {
									return obj.value;
								} ));
							}
						}
						else {
							defer.reject( args[0].value );
							if ( callback ) {
							callback( args[0].value );
							}
						}
					}
				} );
			} );
		}

		return defer;
	};



	// Setting constructor loop
	// Deferred.prototype.constructor = Deferred;



	/**
	 * States of a Promise
	 *
	 * @private
	 * @type {Object}
	 */
	Deferred.state = {
		PENDING : 0,
		FAILURE : 1,
		SUCCESS : 2
	};

	/**
	 * Status of a Promise
	 *
	 * @private
	 * @type {Array}
	 */
	Deferred.status = [
		"pending",
		"rejected",
		"resolved"
	];

	/**
	 * Iterates obj and executes fn
	 *
	 * Parameters for fn are 'value', 'index'
	 *
	 * @method each
	 * @private
	 * @param  {Array}    obj Array to iterate
	 * @param  {Function} fn  Function to execute on index values
	 * @return {Array}        Array
	 */
	function each ( obj, fn ) {
		var nth = obj.length,
		    i   = -1;

		while ( ++i < nth ) {
			if ( fn.call( obj, obj[i], i ) === false ) {
				break;
			}
		}

		return obj;
	}
	/**
	 * Strategy for detemining async method
	 *
	 * @type {Function}
	 * @private
	 * @return {Function} Async method
	 */
	var delay = function () {
		if ( typeof setImmediate != "undefined" ) {
			return setImmediate;
		}
		else if ( typeof process != "undefined" ) {
			return process.nextTick;
		}
		else {
			return function ( arg ) {
				setTimeout( arg, 0 );
			};
		}
	}();

	if ( typeof exports !== "undefined" ) {
	    module.exports = Deferred;
	}
	else if ( typeof define === "function" ) {
	    define( function () {
	        return Deferred;
	    } );
	}
	else {
	    window.Deferred = Deferred;
	}


	/* End Deferred */


	/* Start Ajax */
	function ajax (params, retry) {
		return new Ajax(params, retry);
	}

	var DEFAULT_TIMEOUT = 10000;
	var DEFAULT_METHOD = "GET";
	var DEFAULT_RETRY = 5;
	var DEFAULT_CONTENT_TYPE = 'application/x-www-form-urlencoded; charset=UTF-8';
	var DEFAULT_DATA_TYPE = "json"; // dataType (default: Intelligent Guess (xml, json, script, or html))
	var Ajax = function(params, retry)
	{
		params = params || {};
		retry = retry || 0;
		var self = this;
		this.requestParams = params;
		this.onDone = [];
		this.onAlways = [];
		this.onFail = [];
		this.requestType = params.requestType;
		this.url = params.url;
		this.retry = params.maxRetry || DEFAULT_RETRY;
		this.xhr = new XMLHttpRequest();
		var dataType = params.dataType || DEFAULT_DATA_TYPE;
		var method = params.method === "GET" || params.method === "POST" ? params.method : DEFAULT_METHOD;
		var async = params.async || true;

		var sendData = "";
		if(params.data)
		{
			if(typeof params.data === "object")
			{
				for(var item in params.data)
				{
					var getVal = item+"="+encodeURIComponent(params.data[item]);
					if(method === "GET" && this.url.indexOf(getVal) !== -1 )
					{
						// Skip it
					}
					else
					{
						if(sendData.length > 0)
						{
							sendData += "&";
						}
						sendData += getVal;
					}
				}
			}
			else if(typeof params.data === "string")
			{
				sendData = params.data;
			}
			else
			{
				debugger;
			}
			if(sendData.length > 0 && method === "GET")
			{
				if(this.url.indexOf("?") === -1)
				{
					this.url += "?";
				}
				else
				{
					this.url += "&";
				}
				this.url += sendData;
			}

		}
		this.xhr.open(method, this.url, async);
		this.contentType = params.contentType || DEFAULT_CONTENT_TYPE;
		if(!params.headers || ( params.headers && !params.headers["Content-Type"] ) )
		{
			this.xhr.setRequestHeader("Content-Type", this.contentType);
		}
		if(params.headers)
		{
			if(typeof(params.headers) === "object")
			{
				for(var item in params.headers)
				{
					this.xhr.setRequestHeader(item, params.headers[item]);
				}
			}
			if(!params.headers["X-Requested-With"])
			{
				this.xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			}
			
		}
		this.statusCode = null;
		this.responseObj = {};
		

		var responseType = params.responseType || params.dataType || DEFAULT_DATA_TYPE;
		var failed = false;
		
		

		this.done = function(fun)
		{
			if(typeof(fun) === "function")
			{
				self.onDone.push(fun);
			}
			return this;
		};
		this.success = this.done;
		
		this.fail = function(fun)
		{
			if(typeof(fun) === "function")
			{
				self.onFail.push(fun);
			}
			return this;
		};
		this.always = function(fun)
		{
			if(typeof(fun) === "function")
			{
				self.onAlways.push(fun);
			}
			return this;
		};
		if(params.error)
		{
			this.fail(params.error);
		}
		if(params.success)
		{
			this.done(params.success);
		}
		if(params.complete)
		{
			this.always(params.complete);
		}
		this.resolveCompletedFile = function(url, status, responseText, headers)
		{
			var response = responseText;
			switch(responseType)
			{
				case "json":
					try 
					{
						if(typeof(responseText) === "string")
						{
							responseText = responseText.replace(/(\r\n|\n|\r)/gm,"");
							response = JSON.parse(responseText);
						}
						else
						{
							response = responseText;
						}
						
					}
					catch(e)
					{
						log.handleCatch(e, "fnAjax JSON.parse Fail: "+responseText);
						response = responseText;
					}
				break;
				default:
					response = responseText;
				break;
			}
			var fireFun = function()
			{
				var len = self.onDone.length, i=0, alen = self.onAlways.length;
				for(i=0;i<len;i++)
				{
					self.onDone[i](response, headers, self.requestType, self.xhr);
				}
				for(i=0;i<alen;i++)
				{
					self.onAlways[i](response, headers, self.requestType, self.xhr);
				}
			};
			delay(fireFun());
		};

		this.resolveFailFile = function(e, errorObj)
		{
			var fireFun = function()
			{
				var len = self.onFail.length, i=0, alen = self.onAlways.length;
				var response = errorObj;
				for(i=0;i<len;i++)
				{
					self.onFail[i](response, self.requestType, self.xhr);
				}
				for(i=0;i<alen;i++)
				{
					self.onAlways[i](response, self.requestType, self.xhr);
				}
			};
			if(!failed)
			{
				failed = true;
				delay(fireFun());
			}
		};

		var parseHeaders = function()
		{
			var headers = {};
			var arr = self.xhr.getAllResponseHeaders().split("\n");
			var len = arr.length;
			for(var i=0;i<len;i++)
			{
				if(arr[i].length > 0)
				{
					var idx = arr[i].indexOf(":");
					if(idx > 0)
					{
						var key = arr[i].substring(0, idx);
						var val = arr[i].substring(idx+1).trim();
						headers[key] = val;
					}
				}
			}
			return headers;
		};
		this.xhr.onreadystatechange = function() 
		{
			self.statusCode = self.xhr.status;
	    	if(self.xhr.readyState === 4 && self.xhr.status === 200) 
	    	{
	    		self.responseObj = {
	    			url: self.url, 
	    			status: self.xhr.status, 
	    			responseText: self.xhr.responseText,
	    			requestType: self.requestType
	    		};
	    		var headers = parseHeaders();
	      		self.resolveCompletedFile(self.url, self.xhr.status, self.xhr.responseText, headers);
	    	}
	    	else if(self.xhr.status !== 200 && self.xhr.status !== 0) // fail fast
	    	{
	    		var errorType = null;
	    		switch(self.xhr.status)
	    		{
	    			case 404:
	    				errorType = "NotFound";
	    			break;
	    			default:
	    				errorType = "unknown";
	    			break;
	    		}
	    		self.resolveFailFile({}, {errorType: errorType, status: self.xhr.status, requestType: self.requestType, requestParams: params});
	    	}
	  	};

	  	this.xhr.timeout = params.timeout || DEFAULT_TIMEOUT; // Set timeout to 4 seconds (4000 milliseconds)
		this.xhr.ontimeout = function(e)
		{ 
			if(retry <= self.retry)
			{
				retry++;
				params.timeout = self.xhr.timeout + (retry * 1000);
				delay(function(){
					var nextCall = ajax(params, retry);
					nextCall.fail(function(result)
					{
						self.resolveFailFile(e, {errorType: "xhrTimeout"});
					});
					nextCall.done(function(responseText, requestType, status, url)
					{
						self.resolveCompletedFile(url, status, responseText);
					});
				});
					
			}
			else
			{
				self.resolveFailFile(e, {errorType: "xhrTimeout"});
			}
		};

		this.xhr.onabort = function(e)
		{ 
			self.resolveFailFile(e, {errorType: "xhrAbort"});
		};

		// this.xhr.onloadend = function(e, a, b, c)
		// {
		// 	debugger;
		// };

		this.xhr.onerror = function(e)
		{
			self.resolveFailFile(e, {errorType: "xhrError", status: self.xhr.status, requestType: self.requestType, requestParams: params});
		};

	  	if(method === "GET")
	  	{
	  		this.xhr.send(null);
	  	}
	  	else
	  	{
	  		var data = sendData.length > 0 ? sendData : null;
	  		this.xhr.send( data );
	  	}
	  	return this;
	  	
	};

			

	// Setting constructor loop
	Ajax.prototype.constructor = Ajax;

	/**
	 * Strategy for detemining async method
	 *
	 * @type {Function}
	 * @private
	 * @return {Function} Async method
	 */
	var delay = function () {
		if ( typeof setImmediate != "undefined" ) {
			return setImmediate;
		}
		else if ( typeof process != "undefined" ) {
			return process.nextTick;
		}
		else {
			return function ( arg ) {
				setTimeout( arg, 0 );
			};
		}
	}();



	// Node, AMD & window supported
	if ( typeof exports !== "undefined" ) {
		module.exports = ajax;
	}
	else if ( typeof define === "function" ) {
		define( function () {
			return ajax;
		} );
	}
	else {
		window.ajax = ajax;
	}

	/* End Ajax */




    /* Start ModRewrite */
    var ModRewrite = function(moduleId)
    {
    	//TODO sort fileRules by priority
    	var path = moduleId;
    	var frLen = ModRewrite.fileRules.length;
		for(var i=0;i<frLen;i++)
		{
			var matches = ModRewrite.fileRules[i];
	        if (typeof matches.id === 'string') {
	          	if(matches.id === path) {
	            	path = matches.callback(path);
	          	}
	        }
	        else if (typeof matches.id === 'object') {
	        	try
	        	{
	        		var match = matches.id.test(path);
	        		if(match)
	        		{
	        			path = matches.callback(path);
	        		}
	        	}
	          	catch(e)
	          	{
	          		// do nothing
	          	}
	        }
		}
		// get extension
		var extensionFound = false;
		if(ModRewrite.extensions.length > 0)
		{
			var extLen = ModRewrite.extensions.length; 
			for(var x=0;x<extLen;x++)
			{
				var check = ModRewrite.extensions[x]+"!";
				if(path.indexOf(check) !== -1)
				{
					path = path.replace(check, "");
					path += "."+ModRewrite.extensions[x];
					extensionFound = true;
					break;
				}
			}
		}

		if(path.indexOf("http") === -1)
		{
			// get baseUrl
	    	if(ModRewrite.baseUrl && ModRewrite.baseUrl.length > 0)
	    	{
	    		if(ModRewrite.baseUrl.indexOf("/") === -1 || (ModRewrite.baseUrl.length > 1 && ModRewrite.baseUrl.indexOf("/") + 1 !== ModRewrite.baseUrl.length))
	    		{
	    			ModRewrite.baseUrl += "/";
	    		}
	    		path = ModRewrite.baseUrl + path;
	    	}

	    	if(ModRewrite.useHost && path.indexOf(ModRewrite.useHost) === -1)
			{
				path = ModRewrite.useHost + path;
			}

		}
		else 
		{
			if(path.substr(path.length -3, 3) === ".js") // TODO put in default extension
			{
				extensionFound = true;
			}
		}

		if(!extensionFound)
		{
			path += ".js"; // TODO put in default extension
		}
		
		
			
			
    	// use GET ? 
    	return path;
    };

    ModRewrite.fileRules = [];
    ModRewrite.extensions = [];
    ModRewrite.exports = {};
    ModRewrite.addExtensionRule = function(ext)
    {
    	ModRewrite.extensions.push(ext);
    };
    ModRewrite.addFileRule = function(id, callback)
    {
    	ModRewrite.fileRules.push({id: id, callback: callback});
    };
    ModRewrite.setExports = function(id, exportName)
    {
    	ModRewrite.exports[id] = exportName;
    };

    ModRewrite.baseUrl = "";

    // Node, AMD & window supported
	if ( typeof exports !== "undefined" ) {
		module.exports = ModRewrite;
	}
	else if ( typeof define === "function" ) {
		define( function () {
			return ModRewrite;
		} );
	}
	else {
		window.ModRewrite = ModRewrite;
	}
    /* End ModRewrite */ 	


/* Start Require */

// Url parse
//
( function ( global ) {
	"use strict"; 
	var __modules__ = {};
	var __loading__ = {};

	var require = function(moduleIds, callback, errorCallBack, local) // TODO errorCallBack
	{
		var deferred = null;
		local = local || false;
		callback = typeof callback === "function" ? callback : null;
		errorCallBack = typeof errorCallBack === "function" ? errorCallBack : null;
		var createModule = function(moduleId)
		{
			// log.log("require createModule: {}", moduleId);
			var deferredMod = new Deferred();
			__loading__[moduleId] = deferredMod;
			var module = {
			  	exports: {}
			};
			var exports = {};
			module.moduleId = moduleId;
			var path = ModRewrite(moduleId);
			module.path = path;
			module.loaded = false;
			var getExports = function(result)
			{
				var processMod = function()
				{
					if(moduleId.indexOf("!") !== -1 && typeof result === "string")
					{
						if(moduleId.indexOf("json!") !== -1 || moduleId.indexOf("!json") !== -1)
						{
							try 
							{
								module.exports = JSON.parse(result);
							}
							catch(e)
							{
								console.warn(e.message);
								log.handleCatch(e, "require createModule getExports processMod: "+moduleId);
								
							}
						}
						else
						{
							module.exports = result;
						}
					}
					else if(result.indexOf("module.exports") !== -1)
					{
						try 
						{
							var evalFn = eval(result);
						}
						catch(e)
						{
							module.exports = result;
							log.handleCatch(e, "require createModule getExports processMod: "+moduleId);
						}
					}
					else if(ModRewrite.exports[moduleId])// wrapIt
					{
						try 
						{
							var evalFn = eval(result);
							if(window[ModRewrite.exports[moduleId]])
							{
								module.exports = window[ModRewrite.exports[moduleId]];
							}
							else if(this[ModRewrite.exports[moduleId]])
							{
								module.exports = this[ModRewrite.exports[moduleId]];
							}
							else
							{
								module.exports = result;
							}
						}
						catch(e)
						{
							log.handleCatch(e, "require createModule getExports processMod: "+moduleId);
							module.exports = result;
						}
					}
					else
					{
						try 
						{
							eval(result); // Run the script
						}
						catch(e) 
						{
							log.handleCatch(e, "require createModule getExports processMod: "+moduleId);
						}
						module.exports = result;
						
					}
					module.loaded = true;
					__modules__[moduleId] = module;
					deferredMod.resolve(module.exports);
					if(callback && typeof callback === "function")
					{
						callback(module.exports);
					}
				};
				// If js
				if(result.indexOf("require") !== -1)
				{
					var regexp = /require\(/g;
					var match, matches = [];

					while ((match = regexp.exec(result)) !== null) {
					  matches.push(match.index);
					}
					var dependencies = [];
					var matchLen = matches.length;
					for(var m=0;m<matchLen;m++)
					{
						var end = result.substr(matches[m]).indexOf(")");
						var lib = result.substr(matches[m]+8, end-8);
						if(lib.indexOf("\"") === 0 && lib.substr(lib.length -1) === '"')
						{
							lib = lib.split("\"").join("");
							var load = require(lib);
							if(load instanceof Deferred)
							{
								dependencies.push(load);
							}
						} // Else wait till we are using that module.
						
					}
					if(dependencies && dependencies.length > 0)
					{
						// when
						Deferred.when(dependencies, function()
						{
							processMod();
						});
					}
					else
					{
						processMod();
					}
				}
				else
				{
					processMod();
				}

			};
			// debugger;
			// if(window.__compressed__)
			// {
			// 	for(var item in window.__compressed__)
			// 	{
			// 		debugger;
			// 		if(path.indexOf("http"))
			// 		{

			// 		}
			// 		else
			// 		{

			// 		}
					
			// 	}
			// }
			// TODO change content Type by extension
			ajax({url: path, method:"GET", contentType: "text/plain", dataType: "text"}).done(function(result)
			{
				getExports(result);
			}).fail(function(errorObj){
				log.warn("require ajax FAILED to load Path: "+path+" - {}",errorObj);
				deferredMod.reject(errorObj);
			});

			return deferredMod;
		};
        //Start the craziness
		if(typeof moduleIds === "string")
		{
			if(__modules__[moduleIds] && __modules__[moduleIds].exports)
			{
				deferred = __modules__[moduleIds].exports;
			}
			else if(local)
			{
				deferred = null; // We don't have it yet.
			}
			else if(__loading__[moduleIds])
			{
				deferred = __loading__[moduleIds];
				deferred.done(function(result)
				{
					deferred.resolve(result);
				});
			}
			else
			{
				deferred = new Deferred();
				var create = createModule(moduleIds);
				create.done(function(result)
				{
					deferred.resolve(result);
				});
				create.fail(function(errorObj)
				{
					errorObj.moduleId = moduleIds;
					deferred.reject(errorObj);
				});
			}
		}
		else if(moduleIds instanceof Array)
		{
			deferred = new Deferred();
			var defArr = [];
			var len = moduleIds.length;

			for(var i=0;i<len;i++)
			{
				var lib = moduleIds[i];
				var load = require(lib);
				if(load instanceof Deferred)
				{
					defArr.push(load);
				}
			}
			Deferred.when(defArr, function(obj)
			{
				delay(function()
				{
					var resolveArr = {};
					for(var d=0;d<len;d++)
					{
						var mod = require(moduleIds[d]);
						if(!(mod instanceof Deferred) )
						{
							resolveArr[moduleIds[d]] = mod;
						}
						else
						{
							log.warn("FN_CommonJS - Error loading Module: "+moduleIds[d]);
						}
					}
					deferred.resolve(resolveArr);
					if(callback && typeof callback === "function")
					{
						callback(resolveArr);
					}
				});
			});
		}
		else
		{
			debugger;
		}
		return deferred; // Not always a deferred
	};
	var define = function(id, script)
	{
		__modules__[id] = {exports: script};
	};

	var requireLocal = function(id)
	{
		return __modules__[id] ? __modules__[id].exports : null;
	};

	docReady(function() // Start the party
	{
		define("Deferred", Deferred);
		define("ajax", ajax);
		define("Ajax", ajax);
		define("FN_Log", FN_Log);
		var scripts = function() {
	        return document.getElementsByTagName('script');
	    };
	    var dataMain = null;
		//Look for a data-main script attribute, which could also adjust the baseUrl.
	        //Figure out baseUrl. Get it from the script tag with require.js in it.
	    var scriptsArr = scripts();
	    var scriptsLen = scriptsArr.length;
	    for(var i=0;i<scriptsLen;i++)
	    {
	    	dataMain = scriptsArr[i].getAttribute('data-main');
	    	if(dataMain)
	    	{
	    		require(dataMain);
				break;
	    	}
	    }
	});



} )( this );
/* End Require */
//# sourceURL=/modules/libs/FN_CommonJS.js