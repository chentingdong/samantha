import { gql } from "@apollo/client";

export const REQUEST_SURFACE = gql`
  query requestSurface($id: Int) {
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
`;
