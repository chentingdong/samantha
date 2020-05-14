import { gql } from "@apollo/client";

export const REQUEST_CATALOG = gql`
  query REQUEST_CATALOG {
    blocks(
      orderBy: { id: asc }
      where: {
        AND: [
          { inCatalog: { equals: true } }
          { OR: [{ type: COMPOSITE_PARALLEL }, { type: COMPOSITE_SEQUENTIAL }] }
        ]
      }
    ) {
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
