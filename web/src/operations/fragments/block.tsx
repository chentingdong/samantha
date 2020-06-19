import { gql } from "@apollo/client"

const BlockFullFragment = gql`
  fragment BlockFullFragment on Block {
    id
    name
    description
    type
    state
    props
    context
    parent {
      id
      name
      state
      type
      requestors {
        user_id
      }
    }
    children {
      id
      name
      description
      type
      state
      props
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
        props
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
          props
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
      user_id
    }
    responders {
      user_id
    }
    created_at
    last_updated
  }
`

export { BlockFullFragment }
