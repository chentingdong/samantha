const firstClient = process.env.__NIGHTWATCH_ENV_KEY === "chrome_1"

module.exports = {
  "opening the browser and navigating to the url": (browser) => {
    browser.url("http://localhost:2000").waitForElementVisible("body", 1000)

    if (firstClient) {
      browser.waitForElementVisible("body", 1000).pause()
    } else {
      browser
        .url("http://google.com")
        .waitForElementVisible("body", 1000)
        .pause()
    }
  },
}
