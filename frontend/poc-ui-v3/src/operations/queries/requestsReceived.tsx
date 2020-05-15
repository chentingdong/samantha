import { gql } from "@apollo/client";

export const REQUESTS_RECEIVED = gql`
  query requestsReceived($userId: String) {
    blocks(
      orderBy: { id: desc }
      where: {
        AND: [
          { inCatalog: { equals: false } }
          { responders: { some: { id: { equals: $userId } } } }
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
