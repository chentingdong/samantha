import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"
import { bellFragment } from "../fragments/bells"

export const deleteBellByPk = async ({ id }: { id: string }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation delete_bells_by_pk($id: String!) {
        delete_bells_by_pk(id: $id) {
          ...bellFragment
        }
      }
      ${bellFragment}
    `,
    variables: { id },
  })
  if (errors) return
  return returnData.delete_bells_by_pk
}
