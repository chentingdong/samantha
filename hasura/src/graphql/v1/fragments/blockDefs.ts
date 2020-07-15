import { gql } from "@apollo/client"

const blockDefFragment = gql`
  fragment blockDefFragment on blockDefs {
    id
    name
    description
    blockType {
      value
      category
    }
    type
    blockDefState {
      value
      comment
    }
    state
    control
    props
    root_id
    root {
      id
      name
      blockType {
        value
        category
      }
    }
    parents {
      parent {
        id
        name
        blockType {
          value
          category
        }
      }
    }
    children(order_by: { sibling_order: asc }) {
      sibling_order
      child {
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
        parents {
          parent {
            id
            name
            blockType {
              value
              category
            }
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

export { blockDefFragment }
