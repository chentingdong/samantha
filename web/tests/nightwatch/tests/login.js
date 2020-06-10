const username = process.env.IAM_USERNAME_1
const password = process.env.IAM_PASSWORD_1

module.exports = {
  beforeEach: function (browser) {
    browser.url(browser.launch_url)
  },

  "login redirect": (browser) => {
    browser
      .waitForElementVisible("body")
      .assert.title("Bellhop")
      .assert.urlContains("/login")
  },

  "Google login": (browser) => {
    browser
      .click("button")
      .waitForElementVisible("body")
      .assert.urlContains("accounts.google.com")
      .pause()
      .end()
  },

  "AWS IAM Login": (browser) => {
    browser
      .waitForElementVisible("button.hosted-ui")
      .click("button.hosted-ui")
      .waitForElementVisible("body")
      .setValue(".modal-content-desktop input[name='username']", username)
      .setValue(".modal-content-desktop input[name='password']", password)
      .click(".modal-content-desktop input[type=Submit]")
      .pause(5000)
      .waitForElementVisible("body")
      .assert.urlContains(browser.launch_url)
      .pause(5000)
      .end()
  },
}
