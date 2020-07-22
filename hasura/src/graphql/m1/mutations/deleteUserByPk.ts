import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"

export const deleteUserByPk = async ({ id }: { id: string }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation delete_users_by_pk($id: String!) {
        delete_users_by_pk(id: $id) {
          id
          name
          email
        }
      }
    `,
    variables: { id },
  })
  if (errors) return
  return returnData.delete_users_by_pk
}
