import { gql } from "@apollo/client"

export const REQUESTS_MADE = gql`
  query requestsMade($userId: String) {
    blocks(
      orderBy: { last_updated: desc }
      where: { requestors: { some: { id: { equals: $userId } } } }
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
            parent {
              id
              name
              state
              type
            }
            children {
              id
            }
          }
        }
      }
      requestors {
        id
        name
      }
      responders {
        id
        name
      }
      created_at
      last_updated
    }
  }
`
