import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"

export const deleteBlockDefRequestorByPk = async ({
  blockDef_id,
  user_id,
}: {
  blockDef_id: string
  user_id: string
}) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation delete_blockDef_requestor_by_pk(
        $blockDef_id: String!
        $user_id: String!
      ) {
        delete_blockDef_requestor_by_pk(
          blockDef_id: $blockDef_id
          user_id: $user_id
        ) {
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
    variables: { blockDef_id, user_id },
  })
  if (errors) return
  return returnData.delete_blockDef_requestor_by_pk
}
