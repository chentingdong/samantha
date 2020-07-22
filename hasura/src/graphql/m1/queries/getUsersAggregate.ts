import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"

export const getUsersAggregate = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query users_aggregate {
        users_aggregate {
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
  return data.users_aggregate
}
