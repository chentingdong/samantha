import { gql } from "@apollo/client"

export const GET_USERS = gql`
  query users {
    users(order_by: { name: asc }) {
      id
      name
      email
    }
  }
`
