import { gql } from '@apollo/client'

export const REQUEST_CATALOG = gql`
  query requestCatalog {
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
      description
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
`
