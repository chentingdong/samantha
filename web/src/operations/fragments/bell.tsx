import { blockFullFragment } from "operations/fragments/block"
import { gql } from "@apollo/client"

const bellFragment = gql`
  fragment bellFragment on m2_bells {
    id
    name
    description
    is_definition
    state
    created_at
    updated_at
    started_at
    ended_at
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
        profile_image_url
        bell_participations_by_users {
          user {
            name
          }
        }
      }
    }
    blocks(
      order_by: {
        started_at: asc_nulls_last
        sibling_order: asc_nulls_last
        created_at: asc_nulls_last
      }
    ) {
      ...blockFullFragment
    }
  }
  ${blockFullFragment}
`

export { bellFragment }
