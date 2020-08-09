import { gql } from "@apollo/client"

export const m2BlockFragment = gql`
  fragment m2BlockFragment on m2_blocks {
    id
    local_id
    bell_id
    state
    type
    is_definition
    name
    configs
    parent_id
    children(order_by: { sibling_order: asc_nulls_last }) {
      id
      name
      type
      state
      sibling_order
    }
    sibling_order
    updated_at
  }
`
