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
  fragment bellFragment on m2_bells {
    id
    name
    description
    context
    inputs
    outputs
    state
    is_definition
    created_at
    updated_at
    started_at
    root_block_id
    acts_as_main_bell
    main_bell_id
  }
`

export { bellFragment }
