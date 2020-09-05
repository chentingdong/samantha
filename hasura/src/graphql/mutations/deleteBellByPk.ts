import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"

export const deleteBellByPk = async ({ id }: { id: string }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation delete_bells_by_pk($id: String!) {
        delete_m2_bells_by_pk(id: $id) {
          id
        }
      }
    `,
    variables: { id },
  })
  if (errors) return
  return returnData.delete_m2_bells_by_pk
}
