module.exports = {
  Demo: function (browser) {
    browser
      .url("http://localhost:2000")
      .waitForElementVisible("body", 5000)
      .assert.title("Bellhop")
      .end()
  },
}
