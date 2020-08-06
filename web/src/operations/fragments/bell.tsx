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
        id
        name
        bell_participations_by_users {
          user {
            name
          }
        }
      }
    }
    blocks(order_by: { created_at: asc_nulls_last }) {
      id
      bell_id
      configs
      created_at
      name
      local_id
      is_definition
      sibling_order
      state
      type
      created_at
      updated_at
      ended_at
      parent_id
      parent {
        id
        type
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
    }
  }
`

export { bellFragmentM1, bellFragment }
