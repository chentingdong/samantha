import { gql } from "@apollo/client"

export const REQUEST_CATALOG = gql`
  query requestCatalog {
    blockDefs(
      orderBy: { id: desc }
      where: {
        AND: [
          { OR: [{ type: COMPOSITE_PARALLEL }, { type: COMPOSITE_SEQUENTIAL }] }
          { parent: null }
        ]
      }
    ) {
      id
      name
      description
      type
      control
      context
      parent {
        id
        name
        type
      }
      children {
        id
        name
        description
        type
        control
        context
        children {
          id
          name
          description
          type
          control
          context
          children {
            id
            name
            description
            type
            control
            context
          }
        }
      }
    }
  }
`
