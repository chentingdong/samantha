import { gql } from "@apollo/client"
import { blockDefFullFragment } from "../fragments/blockDef"

export const REQUEST_CATALOG = gql`
  subscription requestCatalog {
    blockDefs(
      order_by: { last_updated: desc }
      where: { _and: { parent_id: { _is_null: true } } }
    ) {
      ...blockDefFullFragment
    }
  }
  ${blockDefFullFragment}
`
