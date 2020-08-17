import { gql } from "@apollo/client"
import { blockFullFragmentM1 } from "../fragments/block"

export const REQUESTS_MADE = gql`
  subscription requestsMade($userId: String) {
    blocks(
      limit: 20
      order_by: { last_updated: desc_nulls_first }
      where: {
        _and: [
          { bells: {} }
          { requestors: { user: { id: { _eq: $userId } } } }
        ]
      }
    ) {
      ...blockFullFragmentM1
    }
  }
  ${blockFullFragmentM1}
`
