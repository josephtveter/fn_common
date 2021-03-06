var ko = require("ko");
var Iscroll = require("iscroll");
var Touches = require("com.component.Touches");
var touches = new Touches();
var touchEnd = ko.observable();
var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

var getPosition = function(elem)
{
    var position = {top: elem.offsetTop, left: elem.offsetLeft};
    if(elem.parentElement)
    {
        var parentEle = getPosition(elem.parentElement);
        position.top = position.top + parentEle.top;
        position.left = position.left + parentEle.left;
    }
    return position
};
var support = {};
support.touch = "ontouchstart" in window;
support.msPointers = window.MSPointerEvent;
support.pointers = window.PointerEvent;

var eventMap = {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
    cancel: "mouseleave"
};
if(isMobile)
{
    if (support.pointers) {
        eventMap = {
            down: "pointerdown",
            move: "pointermove",
            up: "pointerup",
            cancel: "pointercancel" //pointerleave
        };
    } else if (support.msPointers) {
        eventMap = {
            down: "MSPointerDown",
            move: "MSPointerMove",
            up: "MSPointerUp",
            cancel: "MSPointerCancel" // MSPointerLeave
        };
    } else if (support.touch) {
        eventMap = {
            down: "touchstart",
            move: "touchmove",
            up: "touchend", //touchcancel
            cancel: "touchcancel"
        };
    }
}
    

ko.bindingHandlers.range = 
{
    'init': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext)
    {
        var values = valueAccessor();
        var rem = parseInt(window.getComputedStyle(document.body, null).getPropertyValue('font-size'));
        var threshhold = rem / 2;
        var maxEle = null;
        var minEle = null;
        var width = element.clientWidth;
        var minEleLeft = 0;
        var children = element.children;
        var len = children.length;
        var selected = null;


        for(var i=0;i<len;i++)
        {
            if(children[i].className === "rangeStart")
            {
                minEle = children[i];
            }
            else if(children[i].className === "rangeEnd")
            {
                maxEle = children[i];
            }
        }
        var vals = values()
        vals.reset = function()
        {
            minEle.style.left = null;
            maxEle.style.left = null;
        };

        var deselect = function(e)
        {
            selected = null;
        };
        element.addEventListener(eventMap.cancel, deselect);
        element.addEventListener(eventMap.up, deselect);

        // element[eventMap.cancel] = deselect;
        // element[eventMap.up] = deselect;
        element.addEventListener(eventMap.down, function(e)
        {
            if(!selected)
            {
                var touched = null;
                // if(e.touches)
                // {
                //     touched = {x:e.touches[0].pageX, y:e.touches[0].pageY};
                // }
                // else
                // {
                //     touched = {x:e.pageX, y:e.pageY};
                // }
                if(e.offsetX)
                {
                    if(e.offsetX > minEle.offsetLeft && e.offsetX < (minEle.offsetLeft + minEle.clientWidth))
                    {
                        selected = minEle;
                    }
                    else if(e.offsetX > maxEle.offsetLeft && e.offsetX < (maxEle.offsetLeft + maxEle.clientWidth))
                    {
                        selected = maxEle;
                    }
                }
                else if(e.touches && e.touches[0])
                {
                    var pos = getPosition(e.target);
                    var offsetX = e.touches[0].pageX - pos.left;
                    if(offsetX + threshhold > minEle.offsetLeft && offsetX - threshhold < (minEle.offsetLeft + minEle.clientWidth))
                    {
                        selected = minEle;
                    }
                    else if(offsetX + threshhold > maxEle.offsetLeft && offsetX - threshhold < (maxEle.offsetLeft + maxEle.clientWidth))
                    {
                        selected = maxEle;
                    }       
                }
            }
        });

        element.addEventListener(eventMap.move, function(e)
        {
            var getOffsetX = function(elem)
            {
                var pos = getPosition(elem);
                var rtn = 0;
                if(e.touches && e.touches[0])
                {
                    rtn = e.touches[0].pageX - pos.left;
                }
                return rtn;
            };

            var dist = e.offsetX || getOffsetX(e.target);
            var ele = element;
            var vals = values();
            if(selected && selected.style && dist < width && dist > 0)
            {
                var moveEle = function(elem)
                {
                    var safetyLeft = ele.clientWidth - minEle.clientWidth;
                    if(dist >= safetyLeft)
                    {
                        elem.style.left = safetyLeft +"px";
                    }
                    else
                    {
                        elem.style.left = dist +"px";
                    }
                }
                var clientDist = dist / ele.clientWidth;
                var valsDist = vals.maxHigh - vals.maxLow;
                var result = Math.round( clientDist * valsDist );
                var move = result + vals.maxLow;
                if(selected.className === "rangeStart")
                {
                    vals.min(move);
                    // log.log("Min Move: "+move +" Max is: "+vals.max());
                    if(move > vals.max())
                    {
                        vals.max(move);
                        moveEle(maxEle);
                    }
                }
                else if(selected.className === "rangeEnd")
                {
                    vals.max(move);
                    // log.log("Max Move: "+move +" Min is: "+vals.min());
                    if(move < vals.min())
                    {
                        vals.min(move);
                        moveEle(minEle);
                    }
                }
                moveEle(selected);
                
            }
        });
    }
};

ko.bindingHandlers.shoutTap = {
    'init': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) /* , allBindingsAccessor, viewModel, bindingContext */
    {
        var screenId = viewModel.screenId;
        var eventType = "TAP";
        var callback = valueAccessor();
        window.touches.addTouch(element, function(e){
            callback(e);
            touchEnd(e);
        }, eventType, screenId);
    }
};

//only the first child element will be scrolled using iscroll
//must be initialized after screen is visible, so when visibility changes refresh
ko.bindingHandlers.scroll = {
    'init': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext)
    {
        var defaultOptions = {
            mouseWheel: true,
            scrollY: true,
            scrollX: false,
        };
        var iscroll = new Iscroll(element, defaultOptions);

        viewModel.visible.subscribe(function(e)
        {
            if(e)
                iscroll.refresh();
        });
        var endTouch = touchEnd.subscribe(function(e)
        {
            if(e)
            {
                iscroll._end(e);
            }
        });
        var pullToRefresh;
        if(viewModel.pullToRefresh)
        {
            // pullRelease
            iscroll.on('pullRelease', viewModel.pullToRefresh);
            // pulling
            iscroll.on('pulling', function(e)
            {
                viewModel.pulling(true);
            });
            // pullRefresh
            iscroll.on('pullRefresh', function(e)
            {
                viewModel.pulling(false);
                if(viewModel.pullRefresh)
                {
                    viewModel.pullRefresh();
                }
            });
        }
        viewModel.scrollers = viewModel.scrollers || [];
        viewModel.scrollers.push(iscroll);

        if(!viewModel.resetScrollers)
        {
            viewModel.resetScrollers = function()
            {
                var len = viewModel.scrollers.length;
                for(var i=0;i<len;i++)
                {
                    var scroller = viewModel.scrollers[i];
                    if(typeof scroller.resetPosition === "function")
                    {
                        scroller.scrollTo(0,0,0);
                    }
                }
            };
        }
        if(!viewModel.scrollToEle)
        {
            viewModel.scrollToEle = function(ele)
            {
                if(ele)
                {
                    iscroll.scrollToElement(ele);
                }
            };
            
        }
    }
};


//only the first child element will be scrolled using iscroll
//must be initialized after screen is visible, so when visibility changes refresh
ko.bindingHandlers.scrollH = {
    'init': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext)
    {
        var defaultOptions = {
            mouseWheel: false,
            scrollY: false,
            scrollX: true,
        };
        var options = valueAccessor() || {};
        defaultOptions.snap = options.snap ? true : false;
        if(defaultOptions.snap)
        {
            defaultOptions.snapToNext = true;
        }
        var iscroll = new Iscroll(element, defaultOptions);

        viewModel.visible.subscribe(function(e)
        {
            if(e)
                iscroll.refresh();
        });
        var endTouch = touchEnd.subscribe(function(e)
        {
            if(e)
            {
                iscroll._end(e);
            }
        });
        viewModel.scrollers = viewModel.scrollers || [];
        viewModel.scrollers.push(iscroll);
        if(!viewModel.resetScrollers)
        {
            viewModel.resetScrollers = function()
            {
                var len = viewModel.scrollers.length;
                for(var i=0;i<len;i++)
                {
                    var scroller = viewModel.scrollers[i];
                    if(typeof scroller.resetPosition === "function")
                    {
                        scroller.scrollTo(0,0,0);
                    }
                }
            };
        }
        if(!viewModel.scrollToPage)
        {
            viewModel.scrollToPage = function(page)
            {
                var elastic = {
                    style: '',
                    fn: function (k) {
                        var f = 0.22,
                            e = 0.4;

                        if ( k === 0 ) { return 0; }
                        if ( k == 1 ) { return 1; }

                        return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
                    }
                };
                iscroll.goToPage(page, 0, 0.2, elastic);
            };
        }
        viewModel.currentPage(iscroll.currentPage && iscroll.currentPage.pageX ? iscroll.currentPage.pageX : 0);
        
        iscroll.on("scrollEnd", function(e)
        {
            if(viewModel.scrollImages)
            {
                var scrollImages = viewModel.scrollImages();
                var currentPage = this.currentPage.pageX || 0;
                var len = scrollImages.length;
                if(len > 1)
                {
                    
                    for(var i=0;i<len;i++)
                    {
                        if(scrollImages[i].idx === currentPage)
                        {
                            viewModel.currentPage(scrollImages[i].answerId || "HOME");
                            break;
                        }
                    }
                    
                }
                
            }
                
        });
    }
};

if ( typeof exports !== "undefined" ) {
    module.exports = ko;
}
else if ( typeof define === "function" ) {
    define( function () {
        return ko;
    } );
}
else {
    window.ko = ko;
}