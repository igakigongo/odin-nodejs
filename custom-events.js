var events = require("events");
var eventEmitter = new events.EventEmitter();

// create an event handler:
var myEventHandler = function() {
	console.log("I hear a scream");
};

// Assign the event handle to an event
eventEmitter.on("scream", myEventHandler);

// Fire the 'scream' event
eventEmitter.emit("scream");
