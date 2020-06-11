/// <reference types="cypress" />

context("Login", () => {
  it("google login", () => {
    cy.visit(
      "https://samantha.auth.us-east-1.amazoncognito.com/login?redirect_uri=http%3A%2F%2Flocalhost%3A2000&response_type=code&client_id=6d1p0lme6utp45besu853baov6&identity_provider=COGNITO&scopes=email%2Cprofile%2Copenid&state=oYb8HEXogMd9ID9QNcjQoMgPhAYMx2de&code_challenge=OZAOIhbZZWW_HGB1__-5TcsUrZ1qxBulDMnNa_xs6AA&code_challenge_method=S256"
    )
  })

  it("Redirect to Login page", () => {
    cy.get(".modal-content-desktop input[name=username]")
      .type("nightwatch")
      .get(".modal-content-desktop input[name=password]")
      .type("bell2020{enter}")
  })
})
// context("Login 2", () => {
//   it("login to bellhop", () => {
//     cy.visit("http://localhost:2000")
//   })
// })
