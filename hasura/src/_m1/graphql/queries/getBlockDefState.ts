import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"

export const getBlockDefState = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query blockDefState {
        blockDefState {
          value
          blockDefs_aggregate {
            aggregate {
              count
            }
          }
        }
      }
    `,
  })
  if (errors) return undefined
  return data.blockDefState
}
