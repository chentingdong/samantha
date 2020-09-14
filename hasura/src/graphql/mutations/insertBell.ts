import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"

export const insertBell = async ({ data }: { data: object }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation insert_bells_one($object: m2_bells_insert_input!) {
        insert_m2_bells_one(object: $object) {
          id
        }
      }
    `,
    variables: { object: data },
  })
  if (errors) return
  return returnData.insert_m2_bells_one
}
