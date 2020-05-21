import { gql } from "@apollo/client"

export const UPDATE_ONE_BLOCK = gql`
  mutation updateOneBlock(
    $data: BlockUpdateInput!
    $where: BlockWhereUniqueInput!
  ) {
    updateOneBlock(data: $data, where: $where) {
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
