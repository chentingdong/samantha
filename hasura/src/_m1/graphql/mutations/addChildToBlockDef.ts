import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"
import { blockDefFragment } from "../fragments/blockDefs"

export const addChildToBlockDef = async ({
  parent_id,
  child_id,
}: {
  parent_id: string
  child_id: string
}) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation add_child_to_blockDef(
        $parentData: blockDefs_set_input!
        $childData: blockDefs_set_input!
        $parent_id: String!
        $child_id: String!
      ) {
        childBlockDef: update_blockDefs_by_pk(
          _set: $childData
          pk_columns: { id: $child_id }
        ) {
          ...blockDefFragment
        }
        parentBlockDef: update_blockDefs_by_pk(
          _set: $parentData
          pk_columns: { id: $parent_id }
        ) {
          ...blockDefFragment
        }
      }
      ${blockDefFragment}
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
