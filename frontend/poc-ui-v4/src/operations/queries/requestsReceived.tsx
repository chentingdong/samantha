import { gql } from "@apollo/client"

export const REQUESTS_RECEIVED = gql`
  query requestsReceived($userId: String) {
    blocks(
      orderBy: { last_updated: desc }
      where: { responders: { some: { id: { equals: $userId } } } }
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
            parent {
              id
              name
              type
            }
            children {
              id
            }
          }
        }
      }
      created_at
      last_updated
    }
  }
`
