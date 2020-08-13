import {gql} from "@apollo/client"
import {blockFullFragment} from "operations/fragments/block"

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
    is_definition
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
        profile_image_url
        bell_participations_by_users {
          user {
            name
          }
        }
      }
    }
    blocks(
      order_by: { sibling_order: asc_nulls_last, started_at: asc_nulls_last }
    ) {
      ...blockFullFragment
    }
  }
  ${blockFullFragment}
`

export {bellFragmentM1, bellFragment}
