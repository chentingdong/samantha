import { gql } from "@apollo/client"

export const blockFragment = gql`
  fragment blockFragment on m2_blocks {
    id
    local_id
    bell_id
    state
    type
    is_definition
    parent_id
    sibling_order
    updated_at
  }
`
