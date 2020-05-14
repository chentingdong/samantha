import React from "react";
import { gql, useQuery } from "@apollo/client";

const REQUEST_SURFACE = gql`
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

export const RequestorSurface = ({ blockId }) => {
  const { loading, error, data } = useQuery(REQUEST_SURFACE, {
    variables: { id: blockId },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      RequestorSurface for block ID={data.block.id}, name={data.block.name}
    </div>
  );
};
