import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"
import { m2BlockFragment } from "../fragments/blocks"

export const updateBlockByPk = async ({
  id,
  data,
}: {
  id: string
  data: object
}) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation update_blocks_by_pk($data: m2_blocks_set_input, $id: String!) {
        update_m2_blocks_by_pk(_set: $data, pk_columns: { id: $id }) {
          ...m2BlockFragment
        }
      }
      ${m2BlockFragment}
    `,
    variables: { data: { ...data, updated_at: new Date() }, id },
  })
  if (errors) return
  return returnData.update_m2_blocks_by_pk
}
