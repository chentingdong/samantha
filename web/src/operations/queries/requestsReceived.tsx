import { gql } from "@apollo/client"
import { blockFullFragment } from "../fragments/block"

export const REQUESTS_RECEIVED = gql`
  query requestsReceived($userId: String) {
    blocks(
      order_by: { last_updated: desc }
      where: { _and: { block_responders: { user_id: { _eq: $userId } } } }
    ) {
      ...blockFullFragment
    }
  }
  ${blockFullFragment}
`
