import React from "react";
import { gql, useQuery } from "@apollo/client";
import { REQUEST_SURFACE } from "../../operations/queries/requestSurface";

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
