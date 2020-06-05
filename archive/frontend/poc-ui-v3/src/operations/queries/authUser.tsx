import { gql } from "@apollo/client"

export const AUTH_USER = gql`
  query {
    authUser @client {
      id
      name
      email
      isAuthenticated
    }
  }
`
