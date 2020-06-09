const puppeteer = require("puppeteer")

;(async () => {
  const browser = await puppeteer.launch({ headless: false }) // default is true
  console.info(browser)
  await browser.close()
})()
