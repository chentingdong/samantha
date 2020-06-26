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
    root {
      id
      type
      state
      control
    }
    parents {
      parent {
        id
        name
        type
        blockType {
          value
          category
        }
      }
    }
    children(order_by: { sibling_order: asc }) {
      child {
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
        parents {
          parent {
            id
            name
            type
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
        children(order_by: { sibling_order: asc }) {
          child {
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
            parents {
              parent {
                id
                name
                type
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
            children(order_by: { sibling_order: asc }) {
              child {
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
                parents {
                  parent {
                    id
                    name
                    type
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
                children {
                  child {
                    id
                  }
                }
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

export { blockDefFullFragment }
