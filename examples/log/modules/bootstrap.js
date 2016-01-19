/*
* custom logging 
*
* Log codes
*
* trace log = 50
* log log   = 40
* info log  = 30
* warn log  = 20
* error log = 10
* no log    = 0
*
* You can atach objects to logs as the second value.  They will be placed in teh string where you place a {}
*
* logLevel sets the maximum log types showen
*
* logOnly overrides logLevel and only exports logs with that code.
*
*/
log.logLevel = 30;
// log.logOnly = 50;
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");

log.info("Info exposing an object: {}", {stuff:"junk", foo: "Bar", arr: [1,2,3]});

// logging test

log.logLevel = 50;

log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");

log.logLevel = 20;

log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");

log.logLevel = 30;

log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");

log.logLevel = 10;

log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");

log.logOnly = 30;

log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");

log.logOnly = 20;

log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");

log.logOnly = 50;

log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");
log.trace("This is a trace");
log.log("This is a log");
log.info("This is an info");
log.warn("This is a warn");
log.error("This is an error");