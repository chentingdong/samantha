import { blockFullFragment, blockFullFragmentM1 } from "../fragments/block"

import { gql } from "@apollo/client"

export const BLOCKS_BY_PK = gql`
  query blocks_by_pk($id: String) {
    m2_blocks(
      where: { id: { _eq: $id } }
      order_by: { created_at: desc_nulls_first }
    ) {
      ...blockFullFragment
    }
  }
  ${blockFullFragment}
`
