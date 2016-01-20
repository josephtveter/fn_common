// bootstrap
window.appName = "myApp"; // GLOBAL This should be the name of the folder that holds the app.
var mainMod = "com."+appName+".app.App";
var _appInstance = null;
var system = null;
ModRewrite.baseUrl = "modules";

ModRewrite.addExtensionRule("json");
ModRewrite.addExtensionRule("html");
ModRewrite.addExtensionRule("css");

ModRewrite.addFileRule(/com./, function(path)
{
	return path.split(".").join("/");
});

ModRewrite.addFileRule("ko", function(path)
{
	return "libs/knockout-3.3.0";
});
ModRewrite.addFileRule("Screens", function(path)
{
	return "com/"+appName+"/app/objects/screens";
});
//AppNavModel
ModRewrite.addFileRule("AppNavModel", function(path)
{
    return "com/component/AppNavModel";
});
ModRewrite.addFileRule("ScreenNames", function(path)
{
	return "com/"+appName+"/app/objects/screenNames";
});
ModRewrite.addFileRule("KnockoutBindings", function(path)
{
	return "com/component/KnockoutBindings";
});
ModRewrite.addFileRule("iscroll", function(path)
{
    return "libs/iscroll";
});
ModRewrite.addFileRule("jbone", function(path)
{
    return "libs/jbone.min";
});
ModRewrite.addFileRule("Lawnchair", function(path)
{
    return "libs/lawnchair-0.6.1";
});

var koWindowSize = null;
var koWindowSizeResult = null;
require(["com.component.windowSize"], function(modules)
{
	var windowSize = modules["com.component.windowSize"];
	koWindowSizeResult = windowSize();
	window.onresize = function(val, val2)
	{
		koWindowSizeResult = windowSize();
        if(koWindowSize)
        {
            koWindowSize(koWindowSizeResult);
        }
	};
    if(koWindowSize)
    {
        koWindowSize(koWindowSizeResult);
    }
});

    
var getQueryStringParams = function()
{
    var match, urlParams,
    pl     = /\+/g,  // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
    query  = window.location.search.substring(1),
    url = document.URL,
    hashIndex = url.indexOf("#");
    if(hashIndex !== -1)
    {
        urlParams = {loadApp: false};
        window.location.replace(url.substring(0, hashIndex)); // reload the page without the hash.
    }
    else
    {
        urlParams = {};
        while (match = search.exec(query))
        {
            urlParams[decode(match[1])] = decode(match[2]);
        }
    }   
    return urlParams; 
};

window.qsp = getQueryStringParams();

var initModules = function(modules)
{
	var App = modules[mainMod];
    var ko = modules.ko;
    koWindowSize = ko.observable(koWindowSizeResult);
	if(!_appInstance && typeof(App) === "function" )
	{
		_appInstance = new App();
		_appInstance.init({koWindowSize: koWindowSize});
	}
};

if(!qsp || (qsp && qsp.loadApp !== false) )
{
	require(["ko", "KnockoutBindings", mainMod], initModules); // Start the app
}
//# sourceURL=/modules/bootstrap.js