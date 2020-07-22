import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"

export const insertBellhop = async ({ data }: { data: object }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation insert_bellhops_one($object: m2_bellhops_insert_input!) {
        insert_m2_bellhops_one(object: $object) {
          id
          name
        }
      }
    `,
    variables: { object: data },
  })
  if (errors) return
  return returnData.insert_m2_bellhops_one
}
