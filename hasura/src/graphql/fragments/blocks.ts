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
    state
    blockState {
      value
      comment
    }
    control
    props
    context
    root_id
    root {
      id
      name
      context
      blockType {
        value
        category
      }
    }
    parents {
      parent {
        id
        name
        state
        type
        requestors {
          user {
            id
          }
        }
      }
    }
    children(order_by: { sibling_order: asc }) {
      sibling_order
      child {
        id
        name
        description
        type
        state
        control
        props
        context
        parents {
          parent {
            id
            name
            state
            type
            requestors {
              user {
                id
              }
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

export { blockFragment }
