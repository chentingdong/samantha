import { gql } from "@apollo/client"

const blockFragment = gql`
  fragment blockFragment on blocks {
    id
    name
    description
    blockType {
      value
      category
    }
    type
    blockState {
      value
      comment
    }
    state
    control
    props
    context
    root_id
    root {
      id
      name
      blockType {
        value
        category
      }
    }
    parent_id
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
      control
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
        control
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
          control
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

export { blockFragment }
