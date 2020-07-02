let util = require("util")
let events = require("events")

// Build the initial function prototype for our command
function waitForTextInCollection() {
  events.EventEmitter.call(this)
  this.startTimeInMilliseconds = null
  this.checkIntervalInMilliseconds = null
}

// Inherit from the event emitter
util.inherits(waitForTextInCollection, events.EventEmitter)

// Build the actual command to be called
waitForTextInCollection.prototype.command = function (
  collectionSelector,
  targetText,
  waitTimeout,
  callback
) {
  // if the waitTimeout is not specified, use the global timeout value
  if (typeof waitTimeout !== "number") {
    waitTimeout = this.api.globals.waitForConditionTimeout
  }

  // add some data to 'this' to support our work
  let self = this
  this.startTimeInMilliseconds = new Date().getTime()
  this.checkIntervalInMilliseconds = this.api.globals.waitForConditionPollInterval
  this.timeoutInMilliseconds = waitTimeout

  // call the check routine and then handle any results via the callback
  this.check(collectionSelector, targetText, function (result, elapsedTime) {
    let message = 'waitForTextInCollection: "'
    if (result) {
      message += targetText + " was found (" + elapsedTime + "ms)"
    } else {
      message += "text NOT FOUND after " + waitTimeout + " ms"
    }

    self.client.assertion(result, "NOT FOUND", targetText, message, true)

    // the self.emit('complete') has to be called from an async method,
    // otherwise the command succeeds and then just hangs.
    setTimeout(function () {
      self.emit("complete")
    }, 100)
  })

  return this
}

// The method to check if we have found the desired text yet
waitForTextInCollection.prototype.check = function (
  collectionSelector,
  desiredText,
  callback
) {
  // determine "now" and the elapsedTime in milliseconds
  let self = this
  let now = new Date().getTime()
  let elapsedTime = now - self.startTimeInMilliseconds
  if (elapsedTime > self.timeoutInMilliseconds) {
    // we've exceeded the desired timeout period, so fail the command
    callback(false)
    return
  } else {
    // define a collection of data to pass to the page
    let myargs = {
      selector: collectionSelector,
      desiredText: desiredText,
    }

    // ask the page itself to tell us if the text exists at this time
    self.api.execute(
      function (data) {
        var titles = []
        var elements = document.querySelectorAll(data.selector)
        var found = false
        elements.forEach(function (el) {
          if (el.textContent == data.desiredText) {
            found = true
          }
        })
        return found
      },
      [myargs],
      function (result) {
        if (result.value) {
          // Text was found
          callback(true, elapsedTime)
        } else {
          // Text does not exist (yet) so schedule another check
          setTimeout(function () {
            self.check(collectionSelector, desiredText, callback)
          }, self.checkIntervalInMilliseconds)
        }
      }
    )
  }
}

// Export our class
module.exports = waitForTextInCollection
