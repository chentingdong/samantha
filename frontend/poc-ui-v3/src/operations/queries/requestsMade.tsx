import { gql } from "@apollo/client";

export const REQUESTS_MADE = gql`
  query requestsMade($userId: String) {
    blocks(
      orderBy: { id: desc }
      where: {
        AND: [
          { inCatalog: { equals: false } }
          { requestors: { some: { id: { equals: $userId } } } }
        ]
      }
    ) {
      id
      name
      parent {
        id
      }
      children {
        id
        name
        description
        type
        state
      }      
      state
      type
      inCatalog
      requestors {
        name
      }
      responders {
        name
      }
    }
  }
`;
