import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"
import { blockDefFragment } from "../fragments/blockDefs"

export const getBlockDef = async (id: string) => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query blockDefs($id: String) {
        blockDefs(where: { id: { _eq: $id } }) {
          ...blockDefFragment
        }
      }
      ${blockDefFragment}
    `,
    variables: { id },
  })
  if (errors) return undefined
  return data.blockDefs
}
