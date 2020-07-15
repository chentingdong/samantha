import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"
import { blockFragment } from "../fragments/blocks"

export const insertBlock = async ({ data }: { data: object }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation insert_blocks_one($object: blocks_insert_input!) {
        insert_blocks_one(object: $object) {
          ...blockFragment
        }
      }
      ${blockFragment}
    `,
    variables: { object: data },
  })
  if (errors) return
  return returnData.insert_blocks_one
}
