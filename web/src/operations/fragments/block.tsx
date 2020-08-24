import { gql } from "@apollo/client"
import { userFragment } from "./user"

const blockFullFragment = gql`
  fragment blockFullFragment on m2_blocks {
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
      name
      type
      parent {
        id
        name
        type
        parent {
          id
          name
          type
        }
      }
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
        ...userFragment
      }
    }
  }
  ${userFragment}
`

export { blockFullFragment }
