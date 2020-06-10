const puppeteer = require("puppeteer")

;(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  process.on("unhandledRejection", (reason, p) => {
    console.error("Unhandled Rejection at: Promise", p, "reason:", reason)
    browser.close()
  })

  await page.goto("https://example.com")
  await page.screenshot({ path: "example.png" })

  await browser.close()
})()
