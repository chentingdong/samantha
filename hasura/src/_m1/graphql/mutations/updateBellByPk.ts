import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"
import { bellFragment } from "../fragments/bells"

export const updateBellByPk = async ({
  id,
  data,
}: {
  id: string
  data: object
}) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation update_bells_by_pk($data: bells_set_input, $id: String!) {
        update_bells_by_pk(_set: $data, pk_columns: { id: $id }) {
          ...bellFragment
        }
      }
      ${bellFragment}
    `,
    variables: {
      data: { ...data, last_updated: new Date() },
      id,
    },
  })

  if (errors) return
  return returnData.update_bells_by_pk
}
