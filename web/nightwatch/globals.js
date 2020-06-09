var HtmlReporter = require("nightwatch-html-reporter")

var options = {
  openBrowser: false,
  reportsDirectory: __dirname + "/reports/",
  themeName: "default",
}

var reporter = new HtmlReporter(options)

module.exports = {
  write: function (results, options, done) {
    reporter.fn(results, done)
  },
}
