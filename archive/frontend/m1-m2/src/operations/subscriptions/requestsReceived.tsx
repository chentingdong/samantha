import { gql } from "@apollo/client"
import { blockFullFragmentM1 } from "../fragments/block"

export const REQUESTS_RECEIVED = gql`
  subscription requestsReceived($userId: String) {
    blocks(
      limit: 20
      order_by: { last_updated: desc_nulls_first }
      where: { _and: [{ responders: { user: { id: { _eq: $userId } } } }] }
    ) {
      ...blockFullFragmentM1
    }
  }
  ${blockFullFragmentM1}
`
