import { gql } from "@apollo/client"

const blockDefFullFragment = gql`
  fragment blockDefFullFragment on blockDefs {
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
    parent {
      id
      name
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
      parent {
        id
        name
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
        parent {
          id
          name
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
          parent {
            id
            name
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
    requestors {
      user {
        id
        name
        email
      }
    }
    responders {
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
