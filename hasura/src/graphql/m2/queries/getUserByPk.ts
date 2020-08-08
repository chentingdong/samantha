import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"
import { m2UserFragment } from "../fragments/users"

export const getUserByPk = async (id: String) => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query users_by_pk($id: String!) {
        m2_users_by_pk(id: $id) {
          ...m2UserFragment
        }
      }
      ${m2UserFragment}
    `,
    variables: { id },
  })
  if (errors) return undefined
  return data.m2_users_by_pk
}
