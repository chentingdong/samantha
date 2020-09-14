import apolloClient from "../apolloClient"
import { gql, FetchPolicy } from "@apollo/client"
import { blockFragment } from "../fragments/blocks"

export const getBlockByPk = async (
  id: string,
  fetchPolicy: FetchPolicy = "cache-first"
) => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query blocks_by_pk($id: String!) {
        blocks_by_pk(id: $id) {
          ...blockFragment
        }
      }
      ${blockFragment}
    `,
    variables: { id },
    fetchPolicy,
  })
  if (errors) return undefined
  return data.blocks_by_pk
}
