const { events } = require("./event-1");

events.emit("test");
console.log(events.eventNames());
events.emit("test");
events.emit("test");
events.emit("test");
events.emit("test");
events.emit("test");
