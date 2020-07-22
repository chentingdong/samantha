import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"
import { blockFragment } from "../fragments/blocks"

export const getBlocks = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query blocks {
        m2_blocks(order_by: { created_at: asc }) {
          ...blockFragment
        }
      }
      ${blockFragment}
    `,
  })
  if (errors) return undefined
  return data.m2_blocks
}
