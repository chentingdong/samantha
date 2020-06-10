"use strict"

const puppeteer = require("puppeteer")

module.exports.GoogleSocialLogin = async function GoogleSocialLogin(
  options = {}
) {
  validateOptions(options)

  const launchOptions = { headless: !!options.headless }

  if (options.args && options.args.length) {
    launchOptions.args = options.args
  }

  const browser = await puppeteer.launch(launchOptions)
  let page = await browser.newPage()
  let originalPageIndex = 1
  await page.setViewport({ width: 1280, height: 800 })

  await page.goto(options.loginUrl)
  await login({ page, options })

  // Switch to Popup Window
  if (options.isPopup) {
    if (options.popupDelay) {
      await delay(options.popupDelay)
    }
    const pages = await browser.pages()
    // remember original window index
    originalPageIndex = pages.indexOf(
      pages.find((p) => page._target._targetId === p._target._targetId)
    )
    page = pages[pages.length - 1]
  }

  await typeUsername({ page, options })
  await typePassword({ page, options })

  // Switch back to Original Window
  if (options.isPopup) {
    if (options.popupDelay) {
      await delay(options.popupDelay)
    }
    const pages = await browser.pages()
    page = pages[originalPageIndex]
  }

  if (options.cookieDelay) {
    await delay(options.cookieDelay)
  }

  const cookies = await getCookies({ page, options })

  await finalizeSession({ page, browser, options })

  return {
    cookies,
  }
}

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

function validateOptions(options) {
  if (!options.username || !options.password) {
    throw new Error("Username or Password missing for social login")
  }
}

async function login({ page, options } = {}) {
  if (options.preLoginSelector) {
    await page.waitForSelector(options.preLoginSelector)
    await page.click(options.preLoginSelector)
  }

  await page.waitForSelector(options.loginSelector)

  if (options.loginSelectorDelay !== false) {
    await delay(options.loginSelectorDelay)
  }

  await page.click(options.loginSelector)
}

async function typeUsername({ page, options } = {}) {
  let buttonSelector = options.headless ? "#next" : "#identifierNext"

  await page.waitForSelector('input[type="email"]')
  await page.type('input[type="email"]', options.username)
  await page.click(buttonSelector)
}

async function typePassword({ page, options } = {}) {
  let buttonSelector = options.headless ? "#signIn" : "#passwordNext"

  await page.waitForSelector('input[type="password"]', { visible: true })
  await page.type('input[type="password"]', options.password)
  await page.waitForSelector(buttonSelector, { visible: true })
  await page.click(buttonSelector)
}

async function getCookies({ page, options } = {}) {
  await page.waitForSelector(options.postLoginSelector)

  const cookies = options.getAllBrowserCookies
    ? await getCookiesForAllDomains(page)
    : await page.cookies(options.loginUrl)

  if (options.logs) {
    console.log(cookies)
  }

  return cookies
}

async function getCookiesForAllDomains(page) {
  const cookies = await page._client.send("Network.getAllCookies", {})
  return cookies.cookies
}

async function finalizeSession({ page, browser, options } = {}) {
  await browser.close()
}
