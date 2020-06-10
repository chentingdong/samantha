const timePause = 2000

module.exports = {
  beforeEach: function (browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible("body")
      .click("button.with-google")
      .waitForElementVisible("body")
      .assert.urlContains("accounts.google.com")
      .waitForElementVisible("input[type=email]")
      .setValue("input[type=email]", process.env.GOOGLE_USERNAME_1)
      .keys(browser.Keys.ENTER)
      .waitForElementVisible("input[type=password]")
      .setValue("input[type=password]", process.env.GOOGLE_PASSWORD_1)
      .keys(browser.Keys.ENTER)
      .waitForElementVisible("body")
      .assert.title("Bellhop")
  },

  "Navigate to Request Catelog": (browser) => {
    browser.click("li.request-catalog").pause()
  },
}
