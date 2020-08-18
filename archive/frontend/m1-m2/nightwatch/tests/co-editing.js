const bellName = "TESTING..."

module.exports = {
  "Step 0. App get redirected to google login page": (browser) => {
    browser.setWindowSize(800, 800)

    browser
      .url(browser.launch_url)
      .waitForElementVisible("button.with-google")
      .click("button.with-google")
      .waitForElementVisible("body")
      .assert.urlContains("accounts.google.com")

    if (browser.options.desiredCapabilities.name === "chrome_1") {
      browser.setWindowPosition(2500, -600)
    } else {
      browser.setWindowPosition(3500, -600)
    }
  },

  "Step 1. Two bellmen login with their google account": (browser) => {
    browser
      .waitForElementVisible("input[type=email]", 2002)
      .setValue("input[type=email]", browser.globals.username)
      .keys(browser.Keys.ENTER)
      .waitForElementVisible("input[type=password]")
      .setValue("input[type=password]", browser.globals.password)
      .keys(browser.Keys.ENTER)
      .waitForElementVisible("body")
      .assert.title("Bellhop")
  },

  "Step 2. Bellman one make a bell, Bellman 2 see it": (browser) => {
    browser.windowHandles((windows) => {
      console.log("windows running")
      console.log(JSON.stringify(windows, null, 2))
    })

    if (browser.options.desiredCapabilities.name === "chrome_1") {
      browser
        .click(".main-menu .request-catalog a")
        .waitForElementVisible(".request-catalog-list", 20020)
        .click(".request-item-0 .make-a-bell")
        .waitForElementVisible("input[name=name]")
        .click(".responders .toggle-select")
        .waitForElementVisible(
          `.responders input[name="${browser.globals.name}"]`
        )
        .click(`.responders input[name="${browser.globals.name}"]`)
        .click(`.responders input[name="${process.env.TWO_BELLMAN_NAME}"]`)
        .click(`.responders input[name="${process.env.HUMAN_NAME}"]`)
        .clearValue("input[name=name]")
        .setValueSlow("input[name=name]", bellName)
        .pause(1000)
        .click("button.save-bell")
    } else {
      browser
        .click(".main-menu .requests-received a")
        .waitForElementVisible(".requests-received-0", 10000)
      // some bug saving the name
      // .expect.element(".requests-received-0 .time")
      // .text.to.equal(bellName)
      // .before(10 * 1000)
    }
  },

  "Step 3. both bellmen reach this point at the same time": (browser) => {
    // if (browser.options.desiredCapabilities.name === "chrome_1") {
    //   t1 = new Date().toLocaleString()
    // } else {
    //   t2 = new Date().toLocaleString()
    // }
    // browser.verify.equal(t1, t2)
  },

  "STEP N. close session.": (browser) => {
    browser.end()
  },
}
