import { gql } from "@apollo/client"
import { blockDefFullFragment } from "../fragments/blockDef"

export const BLOCK = gql`
  query requestCatalog($id: string) {
    blocks(
      where: { id: { _eq: $id } }
      order_by: { created_at: desc_nulls_first }
    ) {
      ...blockDefFullFragment
    }
  }
  ${blockDefFullFragment}
`
