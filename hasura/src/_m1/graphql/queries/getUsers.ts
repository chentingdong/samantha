import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"
import { userFragment } from "../fragments/users"

export const getUsers = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query users {
        users(order_by: { name: desc_nulls_first }) {
          ...userFragment
        }
      }
      ${userFragment}
    `,
  })
  if (errors) return undefined
  return data.users
}
