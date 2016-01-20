debugger;
var ajax = require("ajax"); // The ajax library is very basic, it is modeled after jquery ajax, but it is not very developed yet.
var greensockUrl = "https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.2/TweenMax.min.js";
ajax({url: greensockUrl}).done(function(result)
{
	debugger;
});