import apolloClient from "../../apolloClient"
import { gql, FetchPolicy } from "@apollo/client"

export const getBellWithContext = async (
  bell_id: String,
  fetchPolicy: FetchPolicy = "cache-first"
) => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query bell_with_context($bell_id: String!) {
        bell: m2_bells_by_pk(id: $bell_id) {
          blocks(where: { type: { _eq: Task } }) {
            local_id
            task {
              fields
            }
          }
        }
      }
    `,
    variables: { bell_id },
    fetchPolicy,
  })
  if (errors) return undefined
  return data.bell
}
