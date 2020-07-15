import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"
import { userFragment } from "../fragments/users"

export const getUserByPk = async (id: String) => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query users_by_pk($id: String!) {
        users_by_pk(id: $id) {
          ...userFragment
        }
      }
      ${userFragment}
    `,
    variables: { id },
  })
  if (errors) return undefined
  return data.users_by_pk
}
