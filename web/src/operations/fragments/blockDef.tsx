import { gql } from "@apollo/client"

const blockDefFullFragment = gql`
  fragment blockDefFullFragment on blockDefs {
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

export { blockDefFullFragment }
