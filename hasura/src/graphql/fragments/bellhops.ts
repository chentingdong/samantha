import { gql } from "@apollo/client"

export const m2BellhopFragment = gql`
  fragment m2BellhopFragment on m2_bellhops {
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
