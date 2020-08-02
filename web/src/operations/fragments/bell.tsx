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
    state
    created_at
    updated_at
    started_at
    context
    inputs
    main_bell_id
    outputs
    user_participations {
      role
      user {
        id
        name
        picture
        given_name
        family_name
      }
    }
    bellhop_participations {
      role
      bellhop {
        name
        bell_participations_by_users {
          user {
            name
          }
        }
      }
    }
    blocks(order_by: { ended_at: asc }) {
      id
      bell_id
      configs
      created_at
      name
      local_id
      is_definition
      sibling_order
      started_at
      ended_at
      state
      type
      updated_at
      parent_id
      parent {
        parent_id
      }
      task {
        id
        title
        fields
      }
      goal {
        goal_name
        id
        success_conditions
        type
      }
    }
  }
`

export { bellFragmentM1, bellFragment }
