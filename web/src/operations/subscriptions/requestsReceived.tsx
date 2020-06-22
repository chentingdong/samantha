import { gql } from "@apollo/client"
import { blockFullFragment } from "../fragments/block"

export const REQUESTS_RECEIVED = gql`
  subscription requestsReceived($userId: String) {
    blocks(
      order_by: { last_updated: desc_nulls_first }
      where: { block_responders: { user: { id: { _eq: $userId } } } }
    ) {
      ...blockFullFragment
    }
  }
  ${blockFullFragment}
`
