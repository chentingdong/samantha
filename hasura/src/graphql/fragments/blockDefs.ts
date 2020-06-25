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
    parent_id
    parent {
      id
      name
      blockType {
        value
        category
      }
    }
    children(order_by: { created_at: asc, id: asc }) {
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
