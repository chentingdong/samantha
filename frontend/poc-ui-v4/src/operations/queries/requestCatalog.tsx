import { gql } from "@apollo/client"
import { BlockDefFullFragment } from "../fragments/blockDef"

export const REQUEST_CATALOG = gql`
  query requestCatalog {
    blockDefs(
      orderBy: { last_updated: desc }
      where: {
        AND: [
          { OR: [{ type: COMPOSITE_PARALLEL }, { type: COMPOSITE_SEQUENTIAL }] }
          { parent: null }
        ]
      }
    ) {
      ...BlockDefFullFragment
    }
  }
  ${BlockDefFullFragment}
`
