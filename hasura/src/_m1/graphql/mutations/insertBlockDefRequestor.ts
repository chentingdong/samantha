import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"

export const insertBlockDefRequestor = async ({ data }: { data: object }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation insert_blockDef_requestor_one(
        $object: blockDef_requestor_insert_input!
      ) {
        insert_blockDef_requestor_one(object: $object) {
          blockDef {
            requestors {
              user_id
            }
          }
          blockDef_id
          user_id
        }
      }
    `,
    variables: { object: data },
  })
  if (errors) return
  return returnData.insert_blockDef_requestor_one
}
