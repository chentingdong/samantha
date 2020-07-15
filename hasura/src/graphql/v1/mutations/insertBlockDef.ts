import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"
import { blockDefFragment } from "../fragments/blockDefs"

export const insertBlockDef = async ({ data }: { data: object }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation insert_blockDefs_one($object: blockDefs_insert_input!) {
        insert_blockDefs_one(object: $object) {
          ...blockDefFragment
        }
      }
      ${blockDefFragment}
    `,
    variables: { object: data },
  })
  if (errors) return
  return returnData.insert_blockDefs_one
}
