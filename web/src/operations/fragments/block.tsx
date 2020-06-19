import { gql } from "@apollo/client"

const BlockFullFragment = gql`
  fragment BlockFullFragment on Block {
    id
    name
    description
    type
    state
    control
    context
    action
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
      action
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
        action
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
          action
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
`

export { BlockFullFragment }
