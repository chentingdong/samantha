import { gql } from "@apollo/client"

export const GET_USERS = gql`
  query users {
    User(order_by: { name: asc }) {
      id
      name
      email
    }
  }
`
