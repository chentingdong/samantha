import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"

export const insertBlock = async ({ data }: { data: object }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation insert_blocks_one($object: m2_blocks_insert_input!) {
        insert_m2_blocks_one(object: $object) {
          id
        }
      }
    `,
    variables: { object: data },
  })
  if (errors) return
  return returnData.insert_m2_blocks_one
}
