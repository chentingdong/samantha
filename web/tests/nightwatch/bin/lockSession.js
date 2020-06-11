exports.command = function (lock) {
  var execSync = require("child_process").execSync
  var waitIterations = lock.seconds > 0 ? Math.floor(lock.seconds / 5) : 30

  console.log(lock)
  var fileTextSwitch = lock.text ? ` -w ${lock.text}` : ""

  if (lock.establish === true) {
    // Establishing a lock.  Will wait to get it

    execSync(
      `./tests/nightwatch/bin/lock-session.sh -c -t ${waitIterations} ${fileTextSwitch}`
    )
  } else {
    // Removing lock

    execSync("./tests/nightwatch/bin/lock-session.sh -r")

    //Pause to give other side a chance to grab the lock.  Can skip for cleanup at beginning, end.

    if (lock.skipPause === undefined || lock.skipPause === false) {
      this.pause(2000)
    }
  }

  return this
}
