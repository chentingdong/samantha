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
          blocks {
            id
            local_id
            type
            state
            started_at
            ended_at
            parent_id
            children {
              id
            }
            sibling_order
            task {
              fields
            }
            bell_executor {
              context
            }
            users: user_participations {
              user_id
              role
            }
          }
          root_block_id
          context
          started_at
          ended_at
          users: user_participations {
            user_id
            role
          }
          bellhops: bellhop_participations {
            bellhop_id
            role
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
