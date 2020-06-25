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
    children(order_by: { created_at: asc, id: asc }) {
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
