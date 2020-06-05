import { gql } from "@apollo/client"
import { BlockFullFragment } from "../fragments/block"

export const REQUESTS_MADE = gql`
  query requestsMade($userId: String) {
    blocks(
      orderBy: { last_updated: desc }
      where: {
        AND: [
          { requestors: { some: { id: { equals: $userId } } } }
          {NOT: {state: COMPLETE}}
        ]
      }
    ) {
      ...BlockFullFragment
    }
  }
  ${BlockFullFragment}
`
