import { gql } from "@apollo/client"
import { BlockFullFragment } from "../fragments/block"

export const REQUESTS_RECEIVED = gql`
  query requestsReceived($userId: String) {
    blocks(
      orderBy: { last_updated: desc }
      where: { responders: { some: { id: { equals: $userId } } } }
    ) {
      ...BlockFullFragment
    }
  }
  ${BlockFullFragment}
`
