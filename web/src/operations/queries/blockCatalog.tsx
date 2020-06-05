import { gql } from "@apollo/client"
import { BlockDefFullFragment } from "../fragments/blockDef"

export const BLOCK_CATALOG = gql`
  query blockCatalog {
    blockDefs(orderBy: { type: asc }, where: { parent: null }) {
      ...BlockDefFullFragment
    }
  }
  ${BlockDefFullFragment}
`
