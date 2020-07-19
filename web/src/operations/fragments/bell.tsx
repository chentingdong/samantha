import { gql } from "@apollo/client"

const bellFragmentM1 = gql`
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

const bellFragment = gql`
  fragment bellFragment on bells {
    id
    name
    description
    state
    context
    created_at
    last_updated
    last_updated
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
