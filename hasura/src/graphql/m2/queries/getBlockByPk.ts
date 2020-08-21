import apolloClient from "../../apolloClient"
import { gql, FetchPolicy } from "@apollo/client"
import { m2BlockFragment } from "../fragments/blocks"

export const getBlockByPk = async (
  id: String,
  fetchPolicy: FetchPolicy = "cache-first"
) => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query blocks_by_pk($id: String!) {
        block: m2_blocks_by_pk(id: $id) {
          ...m2BlockFragment
        }
      }
      ${m2BlockFragment}
    `,
    variables: { id },
    fetchPolicy,
  })
  if (errors) return undefined
  return data.block
}
