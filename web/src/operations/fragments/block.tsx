import { gql } from "@apollo/client"

const blockFullFragment = gql`
  fragment blockFullFragment on blocks {
    id
    name
    description
    type
    blockType {
      value
      category
    }
    state
    control
    props
    context
    parent {
      id
      name
      state
      type
      blockType {
        value
        category
      }
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
      blockType {
        value
        category
      }
      state
      control
      props
      context
      parent {
        id
        name
        state
        type
        blockType {
          value
          category
        }
      }
      children {
        id
        name
        description
        type
        blockType {
          value
          category
        }
        state
        control
        props
        context
        parent {
          id
          name
          state
          type
          blockType {
            value
            category
          }
        }
        children {
          id
          name
          description
          type
          blockType {
            value
            category
          }
          state
          control
          props
          context
          parent {
            id
            name
            state
            type
            blockType {
              value
              category
            }
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
