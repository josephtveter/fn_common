var windowSize = function()
{
    log.log("windowSize");
    var FBAV = navigator.userAgent.toLowerCase().indexOf("fbav") !== -1 && navigator.userAgent.toLowerCase().indexOf("android") !== -1 ? true : false; // Facebook Android
    var screenW = screen.width;
    var screenH = screen.width;
    var self = this;
    var ratio = 35; // DEFAULT BUILD RATIO
	var oldfont = parseInt(window.getComputedStyle(document.body, null).getPropertyValue('font-size'));
	var screenSize;
	var appWidth = document.body.clientWidth || document.body.scrollWidth || document.getElementById("shoutWrapper").clientWidth;
	var appHeight = document.body.clientHeight || document.body.scrollHeight || document.getElementById("shoutWrapper").clientHeight;
	var aspectRatio = appHeight/appWidth;
    var layout = "Portrait";
    if(FBAV)
    {
        appWidth = screenW;
        appHeight = appWidth * aspectRatio;
        document.body.style.width = appWidth+"px";
        document.body.style.height = appHeight+"px";
    }
    if(appWidth <= appHeight)
    {
    	screenSize = appWidth;
    	ratio = 35;
    }
    else // Landscape
    {
        layout = "Landscape";
    	screenSize = appHeight;
    	ratio = 50;
    }
	var font = Math.round(screenSize / ratio);
    if(oldfont !== font && font !== 0)
    {
        document.body.parentNode.style.fontSize = font+"px";
        document.body.style.fontSize = font+"px";
    }
    else if(font === 0)
    {
        window.setTimeout(windowSize, 50);
    }
    
    var results = {aspectRatio:aspectRatio, font: font, appWidth: appWidth, appHeight:appHeight, layout: layout, screenW:screenW, screenH:screenH};
    log.info("windowSize results: {}",results);
    return results;
};
module.exports = windowSize;
//# sourceURL=/modules/com/component/windowSize.js