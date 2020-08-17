import { gql } from "@apollo/client"

export const AUTH_USER = gql`
  query {
    authUser @client {
      id
      name
      email
      family_name
      given_name
      picture
      isAuthenticated
    }
  }
`
