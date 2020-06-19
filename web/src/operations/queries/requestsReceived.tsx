import { gql } from "@apollo/client"
import { BlockFullFragment } from "../fragments/block"

export const REQUESTS_RECEIVED = gql`
  query requestsReceived($userId: String) {
    Block(
      order_by: { last_updated: desc }
      where: { _and: { responders: { user_id: { _eq: $userId } } } }
    ) {
      ...BlockFullFragment
    }
  }
  ${BlockFullFragment}
`
