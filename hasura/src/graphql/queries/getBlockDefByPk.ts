import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"
import { blockDefFragment } from "../fragments/blockDefs"

export const getBlockDefByPk = async (id: string) => {
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
  })
  if (errors) return undefined
  return data.blockDefs_by_pk
}
