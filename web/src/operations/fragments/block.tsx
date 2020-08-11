import { gql } from "@apollo/client"

const blockFullFragment = gql`
  fragment blockFullFragment on m2_blocks {
    id
    bell_id
    configs
    created_at
    name
    local_id
    is_definition
    sibling_order
    state
    type
    created_at
    updated_at
    ended_at
    parent_id
    parent {
      id
      name
      type
    }
    task {
      id
      title
      fields
    }
    goal {
      goal_name
      id
      success_conditions
      type
    }
    user_participations {
      role
      user {
        id
        name
        picture
        given_name
        family_name
      }
    }
  }
`

const blockFullFragmentM1 = gql`
  fragment blockFullFragmentM1 on blocks {
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
    root_id
    root {
      id
      type
      state
      context
      bells {
        id
        name
        description
        context
        started_at
      }
    }
    bells {
      id
      name
      description
      context
      started_at
    }
    parents {
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
        context
        root_id
        root {
          id
          type
          state
          context
        }
        bells {
          id
          name
          description
          context
          started_at
        }
        parents {
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
            context
            root_id
            root {
              id
              type
              state
              context
              bells {
                id
                name
                description
                context
                started_at
              }
            }
            bells {
              id
              name
              description
              context
              started_at
            }
            parents {
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
                context
                root_id
                root {
                  id
                  type
                  state
                  context
                  bells {
                    id
                    name
                    description
                    context
                    started_at
                  }
                }
                bells {
                  id
                  name
                  description
                  context
                  started_at
                }
                parents {
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

export { blockFullFragment, blockFullFragmentM1 }
