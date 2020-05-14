import { gql } from "@apollo/client";

export const REQUESTOR_SURFACE = gql`
  query requestorSurface($id: Int) {
    block(where: { id: $id }) {
      id
      name
      parent {
        id
      }
      state
      type
      context
      children {
        id
        name
        state
        type
      }
      requestors {
        id
        name
      }
      responders {
        id
        name
      }
    }
  }
`
