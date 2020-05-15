import { gql } from '@apollo/client'

export const BLOCK_CATALOG = gql`
  query blockCatalog {
    blocks(orderBy: { id: asc }, where: { inCatalog: { equals: true } }) {
      id
      name
      description
      type
      inCatalog
      state
      control
      context
      parent {
        id
        name
        state
        type
      }
      children {
        id
        name
        description
        type
        state
        control
        context
        children {
          id
          name
          description
          type
          state
          control
          context
          children {
            id
            name
            description
            type
            state
            control
            context
          }
        }
      }
      requestors {
        id
        name
        email
      }
      responders {
        id
        name
        email
      }
    }
  }
`
