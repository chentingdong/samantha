import { gql } from "@apollo/client";

export const BLOCK_CATALOG = gql`
  query blockCatalog {
    blocks(orderBy: { id: asc }, where: { inCatalog: { equals: true } }) {
      id
      name
      parent {
        id
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
