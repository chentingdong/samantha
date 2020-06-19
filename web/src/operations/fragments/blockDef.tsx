import { gql } from "@apollo/client"

const BlockDefFullFragment = gql`
  fragment BlockDefFullFragment on BlockDef {
    id
    name
    description
    type
    state
    props
    parent {
      id
      name
      type
    }
    children {
      id
      name
      description
      type
      state
      props
      parent {
        id
        name
        type
      }
      children {
        id
        name
        description
        type
        state
        props
        parent {
          id
          name
          type
        }
        children {
          id
          name
          description
          type
          state
          props
          parent {
            id
            name
            type
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

export { BlockDefFullFragment }
