import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"
import { bellFragment } from "../fragments/bells"

export const getBell = async (id: string) => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query bells($id: String) {
        bells(where: { id: { _eq: $id } }) {
          ...bellFragment
        }
      }
      ${bellFragment}
    `,
    variables: { id },
  })
  if (errors) return undefined
  return data.bells
}
