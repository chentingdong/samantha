import { gql } from "@apollo/client"

export const CREATE_ONE_BLOCK_DEF = gql`
  mutation createOneBlockDef($data: BlockDefCreateInput!) {
    createOneBlockDef(data: $data) {
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
        children {
          id
          name
          description
          type
          control
          context
          children {
            id
            name
            description
            type
            control
            context
          }
        }
      }
    }
  }
`
