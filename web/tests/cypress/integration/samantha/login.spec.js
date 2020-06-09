/// <reference types="cypress" />
const { GoogleSocialLogin } = require("cypress-social-logins").plugins

context("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:2000")
  })

  it("Redirect to Login page", () => {
    cy.location("pathname")
      .should("eq", "/login")
      .get("button")
      .first()
      .should("have.text", "Login with Google")
  })
})
