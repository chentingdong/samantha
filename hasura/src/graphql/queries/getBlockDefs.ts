import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"
import { blockDefFragment } from "../fragments/blockDefs"

export const getBlockDefs = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query blockDefs {
        blockDefs(
          order_by: { last_updated: desc }
          where: { _and: { parent_id: { _is_null: true } } }
        ) {
          ...blockDefFragment
        }
      }
      ${blockDefFragment}
    `,
  })
  if (errors) return undefined
  return data.blockDefs
}
