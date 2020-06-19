import { gql } from "@apollo/client"
import { BlockFullFragment } from "../fragments/block"

export const REQUESTS_MADE = gql`
  query requestsMade($userId: String) {
    Block(
      order_by: { last_updated: desc }
      where: {
        _and: [
          { requestors: { some: { id: { equals: $userId } } } }
          { NOT: { state: COMPLETE } }
        ]
      }
    ) {
      ...BlockFullFragment
    }
  }
  ${BlockFullFragment}
`
