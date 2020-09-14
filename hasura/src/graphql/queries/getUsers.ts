import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"
import { m2UserFragment } from "../fragments/users"

export const getUsers = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query users {
        m2_users(order_by: { name: desc_nulls_first }) {
          ...m2UserFragment
        }
      }
      ${m2UserFragment}
    `,
  })
  if (errors) return undefined
  return data.m2_users
}
