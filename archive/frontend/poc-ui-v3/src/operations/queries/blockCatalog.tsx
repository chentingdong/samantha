import { gql } from "@apollo/client"

export const BLOCK_CATALOG = gql`
  query blockCatalog {
    blockDefs(orderBy: { id: desc }, where: { parent: null }) {
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
