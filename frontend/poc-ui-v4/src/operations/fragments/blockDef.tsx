import { gql } from "@apollo/client"

const BlockDefFullFragment = gql`
  fragment BlockDefFullFragment on BlockDef {
    id
    name
    description
    type
    control
    context
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
      control
      context
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
        control
        context
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
          control
          context
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
