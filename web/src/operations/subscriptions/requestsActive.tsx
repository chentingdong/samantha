import { gql } from "@apollo/client"
import { blockFullFragment } from "../fragments/block"

export const REQUESTS_ACTIVE = gql`
  subscription requestsActive($userId: String) {
    blocks(
      order_by: { created_at: desc_nulls_first }
      where: {
        _and: [
          { bells: {} }
          { state: { _eq: Running } }
          {
            _or: [
              { requestors: { user_id: { _eq: $userId } } }
              { responders: { user_id: { _eq: $userId } } }
            ]
          }
        ]
      }
    ) {
      ...blockFullFragment
    }
  }
  ${blockFullFragment}
`
