import React from "react";
import { RequestsReceivedItem } from "../block/RequestsReceivedItem";
import { useQuery } from "@apollo/client";
import { REQUESTS_RECEIVED } from "../../operations/queries/requestsReceived";

export const RequestsReceivedList = ({ blocks }) => {
  const { loading, error, data } = useQuery(REQUESTS_RECEIVED, {
    variables: { userId: "Google_111918078641246610063" },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {data.blocks.map((block) => (
        <RequestsReceivedItem block={block} />
      ))}
    </>
  );
};
