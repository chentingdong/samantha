import { gql } from "@apollo/client"

export const CREATE_ONE_BLOCK = gql`
  mutation createOneBlock($data: BlockCreateInput!) {
    createOneBlock(data: $data) {
      id
      name
      description
      type
      state
      control
      context
      parent {
        id
        name
        state
        type
      }
      children {
        id
        name
        description
        type
        state
        control
        context
        children {
          id
          name
          description
          type
          state
          control
          context
          children {
            id
            name
            description
            type
            state
            control
            context
          }
        }
      }
      requestors {
        id
        name
        email
      }
      responders {
        id
        name
        email
      }
    }
  }
`
