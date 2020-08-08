import { gql } from "@apollo/client"

export const m2MainBellFragment = gql`
  fragment m2MainBellFragment on m2_bells {
    id
    name
    state
    context
    is_definition
    root_block_id
    acts_as_main_bell
    success_conditions
    goals(order_by: { goal_order: asc }) {
      goal_name
      root_block {
        type
        form_task {
          title
        }
        state
        goal_executor {
          goal {
            goal_name
          }
        }
        children(order_by: { sibling_order: asc }) {
          type
          goal_executor {
            goal {
              goal_name
            }
          }
          form_task {
            title
          }
        }
      }
      bellhop_participations {
        role
        bellhop {
          name
        }
      }
      user_participations {
        role
        user {
          name
        }
      }
      blocks(where: { type: { _eq: FormTask } }) {
        form_task {
          title
        }
      }
    }
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
