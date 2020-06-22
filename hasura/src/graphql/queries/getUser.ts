import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"
import { userFragment } from "../fragments/users"

export const getUser = async (id: string) => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query users($id: String) {
        users(where: { id: { _eq: $id } }) {
          ...userFragment
        }
      }
      ${userFragment}
    `,
    variables: { id },
  })
  if (errors) return undefined
  return data.users
}
