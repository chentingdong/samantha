import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"
import { blockFragment } from "../fragments/blocks"

export const getBlockByPk = async (id: String) => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query blocks_by_pk($id: String!) {
        m2_blocks_by_pk(id: $id) {
          ...blockFragment
        }
      }
      ${blockFragment}
    `,
    variables: { id },
  })
  if (errors) return undefined
  return data.m2_blocks_by_pk
}
