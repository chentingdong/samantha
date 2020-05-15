import { gql } from "@apollo/client"

export const REQUESTOR_SURFACE = gql`
  query requestorSurface($id: Int) {
    block(where: { id: $id }) {
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
