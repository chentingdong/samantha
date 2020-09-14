import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"

export const getBlockDefsAggregate = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query blockDefs_aggregate {
        blockDefs_aggregate {
          aggregate {
            max {
              id
            }
            min {
              id
            }
            count
          }
        }
      }
    `,
  })
  if (errors) return undefined
  return data.blockDefs_aggregate
}
