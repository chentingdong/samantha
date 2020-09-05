import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"
import { blockDefFragment } from "../fragments/blockDefs"

export const deleteBlockDefByPk = async ({ id }: { id: string }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation delete_blockDefs_by_pk($id: String!) {
        delete_blockDefs_by_pk(id: $id) {
          ...blockDefFragment
        }
      }
      ${blockDefFragment}
    `,
    variables: { id },
  })
  if (errors) return
  return returnData.delete_blockDefs_by_pk
}
