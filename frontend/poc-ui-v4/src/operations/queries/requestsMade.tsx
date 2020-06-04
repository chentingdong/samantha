import { gql } from "@apollo/client"
import { BlockFullFragment } from "../fragments/block"

export const REQUESTS_MADE = gql`
  query requestsMade($userId: String) {
    blocks(
      orderBy: { last_updated: desc }
      where: { requestors: { some: { id: { equals: $userId } } } }
    ) {
      ...BlockFullFragment
    }
  }
  ${BlockFullFragment}
`
