module.exports = {
  before: function (browser) {
    browser.url(browser.launch_url)
  },

  "login redirect": (browser) => {
    browser
      .waitForElementVisible("body")
      .assert.title("Bellhop")
      .assert.urlContains("/login")
  },

  // "AWS IAM Login": (browser) => {
  //   browser
  //     .waitForElementVisible("button.hosted-ui")
  //     .click("button.hosted-ui")
  //     .waitForElementVisible("body")
  //     .setValue(
  //       ".modal-content-desktop input[name='username']",
  //       process.env.IAM_USERNAME_1
  //     )
  //     .setValue(
  //       ".modal-content-desktop input[name='password']",
  //       process.env.IAM_PASSWORD_1
  //     )
  //     .click(".modal-content-desktop input[type=Submit]")
  //     .waitForElementVisible("body")
  //     .assert.urlContains(browser.launch_url)
  //     .end()
  // },
}
