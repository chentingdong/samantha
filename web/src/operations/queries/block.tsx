import { gql } from "@apollo/client"
import { blockDefFullFragment } from "../fragments/blockDef"

export const BLOCK = gql`
  query requestCatalog($id: string) {
    blocks(where: { id: { _eq: $id } }) {
      ...blockDefFullFragment
    }
  }
  ${blockDefFullFragment}
`
