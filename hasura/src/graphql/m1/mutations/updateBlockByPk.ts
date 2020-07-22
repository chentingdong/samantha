import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"
import { blockFragment } from "../fragments/blocks"

export const updateBlockByPk = async ({
  id,
  data,
}: {
  id: string
  data: object
}) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation update_blocks_by_pk($data: blocks_set_input, $id: String!) {
        update_blocks_by_pk(_set: $data, pk_columns: { id: $id }) {
          ...blockFragment
        }
      }
      ${blockFragment}
    `,
    variables: { data: { ...data, last_updated: new Date() }, id },
  })
  if (errors) return
  return returnData.update_blocks_by_pk
}
