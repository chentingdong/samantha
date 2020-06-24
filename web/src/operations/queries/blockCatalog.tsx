import { gql } from "@apollo/client"
import { blockDefFullFragment } from "../fragments/blockDef"

export const BLOCK_CATALOG = gql`
  query requestCatalog {
    blockDefs(order_by: { last_updated: desc_nulls_first }) {
      ...blockDefFullFragment
    }
  }

  ${blockDefFullFragment}
`
