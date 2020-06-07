module.exports = {
  "Demo test Google": function (client) {
    client
      .url("http://www.google.com")
      .waitForElementVisible("body", 1000)
      .assert.title("Google")
      .assert.visible("input[type=text]")
      .setValue("input[type=text]", "javascript end to end testing")
      .keys(client.Keys.ENTER)
      .pause(1000)
      .assert.containsText("#main", "Nightwatch.js")
      .end()
  },
}
