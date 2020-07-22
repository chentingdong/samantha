import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"

export const insertBlockRequestor = async ({ data }: { data: object }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation insert_block_requestor_one(
        $object: block_requestor_insert_input!
      ) {
        insert_block_requestor_one(object: $object) {
          block {
            requestors {
              user_id
            }
          }
          block_id
          user_id
        }
      }
    `,
    variables: { object: data },
  })
  if (errors) return
  return returnData.insert_block_requestor_one
}
