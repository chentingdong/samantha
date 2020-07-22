import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"
import { blockFragment } from "../fragments/blocks"

export const deleteBlockByPk = async ({ id }: { id: string }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation delete_blocks_by_pk($id: String!) {
        delete_blocks_by_pk(id: $id) {
          ...blockFragment
        }
      }
      ${blockFragment}
    `,
    variables: { id },
  })
  if (errors) return
  return returnData.delete_blocks_by_pk
}
