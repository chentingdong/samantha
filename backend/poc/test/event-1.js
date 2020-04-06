const { events } = require("../src/core/events");
events.addListener("test", (evtName, fn) => {
  console.log("here");
});
console.log(events.eventNames());
module.exports.events = events;
