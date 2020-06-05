import { gql } from "@apollo/client"

export const REQUESTS_RECEIVED = gql`
  query requestsReceived($userId: String) {
    blocks(
      orderBy: { id: desc }
      where: { responders: { some: { id: { equals: $userId } } } }
    ) {
      id
      name
      description
      type
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
