import { gql } from "@apollo/client"

const blockFullFragment = gql`
  fragment blockFullFragment on blocks {
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
      block_requestors {
        user {
          id
        }
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
    block_requestors {
      user {
        id
        name
        email
      }
    }
    block_responders {
      user {
        id
        name
        email
      }
    }
    created_at
    last_updated
  }
`

export { blockFullFragment }
