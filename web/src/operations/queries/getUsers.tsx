import { gql } from "@apollo/client"

export const GET_USERS = gql`
  query users {
    users(order_by: { name: desc_nulls_first }) {
      id
      name
      email
    }
  }
`
