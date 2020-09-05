import apolloClient from "../apolloClient"
import { gql } from "@apollo/client"

export const getBlockType = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query blockType {
        blockType {
          value
          category
          blocks_aggregate {
            aggregate {
              count
            }
          }
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
  return data.blockType
}
