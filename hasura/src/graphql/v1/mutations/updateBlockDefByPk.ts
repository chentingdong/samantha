import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"
import { blockDefFragment } from "../fragments/blockDefs"

export const updateBlockDefByPk = async ({
  id,
  data,
}: {
  id: string
  data: object
}) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation update_blockDefs_by_pk(
        $data: blockDefs_set_input
        $id: String!
      ) {
        update_blockDefs_by_pk(_set: $data, pk_columns: { id: $id }) {
          ...blockDefFragment
        }
      }
      ${blockDefFragment}
    `,
    variables: { data: { ...data, last_updated: new Date() }, id },
  })
  if (errors) return
  return returnData.update_blockDefs_by_pk
}
