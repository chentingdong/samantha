import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"
import { blockFragment } from "../fragments/blocks"

export const getBlock = async (id: string) => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query blocks($id: String) {
        blocks(where: { id: { _eq: $id } }) {
          ...blockFragment
        }
      }
      ${blockFragment}
    `,
    variables: { id },
  })
  if (errors) return undefined
  return data.blocks
}
