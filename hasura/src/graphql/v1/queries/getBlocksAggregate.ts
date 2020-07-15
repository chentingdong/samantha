import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"

export const getBlocksAggregate = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query blocks_aggregate {
        blocks_aggregate {
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
  return data.blocks_aggregate
}
