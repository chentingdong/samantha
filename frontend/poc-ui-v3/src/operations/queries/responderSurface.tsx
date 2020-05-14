import { gql } from "@apollo/client";

export const RESPONDER_SURFACE = gql`
  query responderSurface($id: Int) {
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
