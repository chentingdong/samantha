import { gql } from "@apollo/client"
import { BlockDefFullFragment } from "../fragments/blockDef"

export const BLOCK_CATALOG = gql`
  query blockCatalog {
    BlockDef(
      order_by: { last_updated: desc }
      where: { _and: { parent_id: { _is_null: true } } }
    ) {
      ...BlockDefFullFragment
    }
  }
  ${BlockDefFullFragment}
`
