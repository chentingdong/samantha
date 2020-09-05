import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"

export const deleteBlockParentChildByPk = async ({
  parent_id,
  child_id,
}: {
  parent_id: string
  child_id: string
}) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation delete_block_parent_child_by_pk(
        $parent_id: String!
        $child_id: String!
      ) {
        delete_block_parent_child_by_pk(
          parent_id: $parent_id
          child_id: $child_id
        ) {
          parent_id
          child_id
          sibling_order
        }
      }
    `,
    variables: { parent_id, child_id },
  })
  if (errors) return
  return returnData.delete_block_parent_child_by_pk
}
