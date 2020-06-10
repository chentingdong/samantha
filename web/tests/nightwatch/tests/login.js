module.exports = {
  beforeEach: function (browser) {
    browser.url(browser.launch_url)
  },

  "login redirect": (browser) => {
    browser
      .waitForElementVisible("body")
      .assert.title("Bellhop")
      .assert.urlContains("/login")
      .end()
  },

  "Google login": (browser) => {
    browser
      .click("button.with-google")
      .waitForElementVisible("body")
      .assert.urlContains("accounts.google.com")
      .end()
  },

  "AWS IAM Login": (browser) => {
    browser
      .waitForElementVisible("button.hosted-ui")
      .click("button.hosted-ui")
      .waitForElementVisible("body")
      .setValue(
        ".modal-content-desktop input[name='username']",
        process.env.IAM_USERNAME_1
      )
      .setValue(
        ".modal-content-desktop input[name='password']",
        process.env.IAM_PASSWORD_1
      )
      .click(".modal-content-desktop input[type=Submit]")
      .pause(5000)
      .waitForElementVisible("body")
      .assert.urlContains(browser.launch_url)
      .pause(5000)
      .end()
  },
}
