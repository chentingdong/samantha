import { gql } from "@apollo/client"
import { BlockDefFullFragment } from "../fragments/blockDef"

export const REQUEST_CATALOG = gql`
  query requestCatalog {
    blockDefs(
      orderBy: { last_updated: desc }
      where: { AND: [{ parent: null }] }
    ) {
      ...BlockDefFullFragment
    }
  }
  ${BlockDefFullFragment}
`
