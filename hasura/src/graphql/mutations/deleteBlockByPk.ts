import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"

export const deleteBlockByPk = async ({ id }: { id: string }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation delete_blocks_by_pk($id: String!) {
        delete_m2_blocks_by_pk(id: $id) {
          id
        }
      }
    `,
    variables: { id },
  })
  if (errors) return
  return returnData.delete_m2_blocks_by_pk
}
