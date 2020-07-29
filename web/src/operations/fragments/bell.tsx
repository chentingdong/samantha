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
    created_at
    context
    inputs
    main_bell_id
    outputs
    user_participations {
      user {
        id
        name
        picture
        given_name
        family_name
      }
    }
    blocks {
      bell_id
      configs
      created_at
      name
      local_id
      is_definition
      sibling_order
      started_at
      state
      type
      updated_at
      goal {
        goal_name
        id
        success_conditions
        type
      }
      id
    }
  }
`

export { bellFragmentM1, bellFragment }
