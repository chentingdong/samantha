import { gql } from "@apollo/client"

export const GET_USERS = gql`
  query users {
    users(orderBy: { name: asc }) {
      id
      name
      email
    }
  }
`