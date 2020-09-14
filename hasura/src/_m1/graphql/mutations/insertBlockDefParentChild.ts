import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"

export const insertBlockDefParentChild = async ({ data }: { data: object }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation insert_blockDef_parent_child_one(
        $object: blockDef_parent_child_insert_input!
      ) {
        insert_blockDef_parent_child_one(object: $object) {
          parent_id
          child_id
          sibling_order
        }
      }
    `,
    variables: { object: data },
  })
  if (errors) return
  return returnData.insert_blockDef_parent_child_one
}
