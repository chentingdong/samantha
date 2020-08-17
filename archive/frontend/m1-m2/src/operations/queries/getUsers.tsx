import {gql} from "@apollo/client"

export const GET_USERS = gql`
  query users {
    m2_users(order_by: { name: desc_nulls_first }) {
      id
      name
      email
      family_name
      given_name
      picture
    }
  }
`
