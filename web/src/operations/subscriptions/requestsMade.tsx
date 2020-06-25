import { gql } from "@apollo/client"
import { blockFullFragment } from "../fragments/block"

export const REQUESTS_MADE = gql`
  subscription requestsMade($userId: String) {
    blocks(
      order_by: { last_updated: desc_nulls_first }
      where: { requestors: { user: { id: { _eq: $userId } } } }
    ) {
      ...blockFullFragment
    }
  }
  ${blockFullFragment}
`
