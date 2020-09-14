import apolloClient from "../apolloClient"
import { gql, FetchPolicy } from "@apollo/client"
import { blockDefFragment } from "../fragments/blockDefs"

export const getBlockDefByPk = async (
  id: string,
  fetchPolicy: FetchPolicy = "cache-first"
) => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query blockDefs_by_pk($id: String!) {
        blockDefs_by_pk(id: $id) {
          ...blockDefFragment
        }
      }
      ${blockDefFragment}
    `,
    variables: { id },
    fetchPolicy,
  })
  if (errors) return undefined
  return data.blockDefs_by_pk
}
