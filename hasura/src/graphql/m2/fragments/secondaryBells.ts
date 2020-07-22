import { gql } from "@apollo/client"

export const secondaryBellFragment = gql`
  fragment secondaryBellFragment on m2_bells {
    id
    name
    is_definition
    goal_name
    root_block_id
    acts_as_main_bell
    main_bell_id
    goal_order
    success_conditions
    user_participations {
      user {
        name
      }
      role
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
  }
`
