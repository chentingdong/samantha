import { gql } from "@apollo/client"
import { BlockFullFragment } from "../fragments/block"

export const REQUESTS_RECEIVED = gql`
  query requestsReceived($userId: String) {
    blocks(
      orderBy: { last_updated: desc }
      where: { 
        AND: [
          {responders: { some: { id: { equals: $userId } } }}
          {NOT: {state: COMPLETE}}
        ]
      }
    ) {
      ...BlockFullFragment
    }
  }
  ${BlockFullFragment}
`
