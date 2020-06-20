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
    created_at
    last_updated
  }
`

export { blockDefFullFragment }
