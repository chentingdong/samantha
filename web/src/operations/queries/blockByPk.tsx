import { gql } from "@apollo/client"
import { blockFullFragment } from "../fragments/block"

export const BLOCKS_BY_PK = gql`
  query blocks_by_pk($id: String) {
    blocks(
      where: { id: { _eq: $id } }
      order_by: { created_at: desc_nulls_first }
    ) {
      ...blockFullFragment
    }
  }
  ${blockFullFragment}
`
