var primaryUser = process.env.GOOGLE_USERNAME_1

module.exports = {
  beforeEach: function (browser) {
    browser.url(browser.launch_url)
  },

  "Step 1": (browser) => {
    if (primaryUser) {
      browser
        .lockSession({ establish: true, text: "primary", seconds: 120 })
        .lockSession({ establish: false })
    } else {
      browser
        .lockSession({ establish: true, text: "secondary", seconds: 200 })
        .lockSession({ establish: false })
    }
  },
}
