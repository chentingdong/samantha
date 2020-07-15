import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"
import { blockFragment } from "../fragments/blocks"

export const getBlocks = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query blocks {
        blocks(order_by: { last_updated: desc }) {
          ...blockFragment
        }
      }
      ${blockFragment}
    `,
  })
  if (errors) return undefined
  return data.blocks
}
