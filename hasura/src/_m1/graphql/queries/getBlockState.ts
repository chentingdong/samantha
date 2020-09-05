import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"

export const getBlockState = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query blockState {
        blockState {
          value
          blocks_aggregate {
            aggregate {
              count
            }
          }
        }
      }
    `,
  })
  if (errors) return undefined
  return data.blockState
}
