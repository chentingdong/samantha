import { gql } from "@apollo/client"

export const userFragment = gql`
  fragment userFragment on users {
    id
    name
    email
    block_requestors {
      block_id
      block {
        id
      }
    }
    block_responders {
      block_id
      block {
        id
      }
    }
  }
`
