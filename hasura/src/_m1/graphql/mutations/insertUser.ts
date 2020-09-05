import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"

export const insertUser = async ({ data }: { data: object }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation insert_users_one($object: users_insert_input!) {
        insert_users_one(object: $object) {
          id
          name
          email
        }
      }
    `,
    variables: { object: data },
  })
  if (errors) return
  return returnData.insert_users_one
}
