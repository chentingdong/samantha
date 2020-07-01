import { gql } from "@apollo/client"

const bellFragment = gql`
  fragment bellFragment on bells {
    id
    name
    description
    state
    blockState {
      value
      comment
    }
    context
    created_at
    last_updated
    started_at
    root_block_id
    block {
      id
      name
      description
      requestors {
        user {
          id
          name
        }
      }
      responders {
        user {
          id
          name
        }
      }
    }
  }
`
export { bellFragment }
