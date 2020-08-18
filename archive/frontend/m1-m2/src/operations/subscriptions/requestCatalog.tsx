import { gql } from "@apollo/client"
import { blockDefFullFragment } from "../fragments/blockDef"

export const REQUEST_CATALOG = gql`
  subscription requestCatalog {
    blockDefs(order_by: { last_updated: desc }) {
      ...blockDefFullFragment
    }
  }
  ${blockDefFullFragment}
`
