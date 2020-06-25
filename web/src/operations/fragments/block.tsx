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
      requestors {
        user {
          id
        }
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

export { blockFullFragment }
