import { gql } from "@apollo/client"

export const bellhopFragment = gql`
  fragment bellhopFragment on m2_bellhops {
    id
    name
    memberships {
      role
      user {
        id
        name
      }
    }
  }
`
