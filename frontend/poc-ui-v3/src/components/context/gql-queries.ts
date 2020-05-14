import { gql } from 'apollo-boost'

export const REQUEST_SURFACE = gql`
  query requestSurface($id: Int) {
    block(where: { id: $id }) {
      id
      name
      parent {
        id
      }
      state
      type
      context
      children {
        id
        name
        state
        type
      }
      requestors {
        id
        name
      }
      responders {
        id
        name
      }
    }
  }
`
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
`
