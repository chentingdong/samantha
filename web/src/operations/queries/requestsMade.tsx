import { gql } from "@apollo/client"
import { blockFullFragment } from "../fragments/block"

export const REQUESTS_MADE = gql`
  query requestsMade($userId: String) {
    blocks(
      order_by: { last_updated: desc }
      where: { _and: { block_requestors: { user_id: { _eq: $userId } } } }
    ) {
      ...blockFullFragment
    }
  }
  ${blockFullFragment}
`
