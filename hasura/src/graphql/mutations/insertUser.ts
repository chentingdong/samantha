import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"

export const insertUser = async ({ data }: { data: object }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation insert_users_one($object: m2_users_insert_input!) {
        insert_m2_users_one(object: $object) {
          id
          name
        }
      }
    `,
    variables: { object: data },
  })
  if (errors) return
  return returnData.insert_m2_users_one
}
