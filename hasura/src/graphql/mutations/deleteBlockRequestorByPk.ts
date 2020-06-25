import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"

export const deleteBlockRequestorByPk = async ({
  block_id,
  user_id,
}: {
  block_id: string
  user_id: string
}) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation delete_block_requestor_by_pk(
        $block_id: String!
        $user_id: String!
      ) {
        delete_block_requestor_by_pk(block_id: $block_id, user_id: $user_id) {
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
    variables: { block_id, user_id },
  })
  if (errors) return
  return returnData.delete_block_requestor_by_pk
}
