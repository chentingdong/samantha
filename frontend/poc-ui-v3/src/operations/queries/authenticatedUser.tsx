import { gql } from "@apollo/client"

export const AUTHENTICATED_USER = gql`
  query authenticatedUser {
    authenticatedUser @client {
      id
      name
      email
    }
  }
`
