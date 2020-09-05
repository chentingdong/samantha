import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"
import { bellFragment } from "../fragments/bells"

export const insertBell = async ({ data }: { data: object }) => {
  const { data: returnData, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation insert_bells_one($object: bells_insert_input!) {
        insert_bells_one(object: $object) {
          ...bellFragment
        }
      }
      ${bellFragment}
    `,
    variables: { object: data },
  })
  if (errors) return
  return returnData.insert_bells_one
}
