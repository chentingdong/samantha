import { gql } from "@apollo/client"

export const RESPONDER_SURFACE = gql`
  query responderSurface($id: Int) {
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
        name
        description
        type
        state
        control
        context
        children {
          name
          description
          type
          state
          control
          context
          children {
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
