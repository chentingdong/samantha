import { gql } from "@apollo/client"

const blockDefFullFragment = gql`
  fragment blockDefFullFragment on blockDefs {
    id
    name
    description
    blockType {
      value
      category
    }
    state
    control
    props
    parent {
      id
      name
      blockType {
        value
        category
      }
    }
    children {
      id
      name
      description
      blockType {
        value
        category
      }
      state
      control
      props
      parent {
        id
        name
        blockType {
          value
          category
        }
      }
      children {
        id
        name
        description
        blockType {
          value
          category
        }
        state
        control
        props
        parent {
          id
          name
          blockType {
            value
            category
          }
        }
        children {
          id
          name
          description
          blockType {
            value
            category
          }
          state
          control
          props
          parent {
            id
            name
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

export { blockDefFullFragment }
