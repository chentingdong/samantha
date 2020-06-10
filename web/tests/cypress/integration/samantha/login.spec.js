/// <reference types="cypress" />

const { GoogleSocialLogin } = require("../../plugins/google")

module.exports = (on, config) => {
  on("task", {
    GoogleSocialLogin: GoogleSocialLogin,
  })
}

describe("Login", () => {
  it("Login through Google", () => {
    const username = process.env.GOOGLE_USERNAME_1
    const password = process.env.GOOGLE_PASSWORD_1
    const loginUrl = Cypress.env("loginUrl")
    const cookieName = "samantha"
    const socialLoginOptions = {
      username,
      password,
      loginUrl,
      headless: true,
      logs: false,
      loginSelector: 'a[href="/auth/auth0/google-oauth2"]',
      postLoginSelector: ".account-panel",
    }

    return cy.task("GoogleSocialLogin", socialLoginOptions)
    // .then(({ cookies }) => {
    //   cy.clearCookies()

    //   const cookie = cookies
    //     .filter((cookie) => cookie.name === cookieName)
    //     .pop()
    //   if (cookie) {
    //     cy.setCookie(cookie.name, cookie.value, {
    //       domain: cookie.domain,
    //       expiry: cookie.expires,
    //       httpOnly: cookie.httpOnly,
    //       path: cookie.path,
    //       secure: cookie.secure,
    //     })

    //     Cypress.Cookies.defaults({
    //       whitelist: cookieName,
    //     })
    //   }
    // })
  })
})
