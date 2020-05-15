import { gql } from "@apollo/client"

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
