import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"
import { blockFragment } from "../fragments/blocks"

export const addChildToBlock = async ({
  parent_id,
  child_id,
}: {
  parent_id: string
  child_id: string
}) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation add_child_to_block(
        $parentData: blocks_set_input!
        $childData: blocks_set_input!
        $parent_id: String!
        $child_id: String!
      ) {
        childBlock: update_blocks_by_pk(
          _set: $childData
          pk_columns: { id: $child_id }
        ) {
          ...blockFragment
        }
        parentBlock: update_blocks_by_pk(
          _set: $parentData
          pk_columns: { id: $parent_id }
        ) {
          ...blockFragment
        }
      }
      ${blockFragment}
    `,
    variables: {
      parentData: { last_updated: new Date() },
      childData: { parent_id, last_updated: new Date() },
      parent_id,
      child_id,
    },
  })
  if (errors) return
  return returnData
}
