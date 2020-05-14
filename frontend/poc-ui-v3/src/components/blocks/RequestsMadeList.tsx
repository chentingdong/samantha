import React from "react";
import { RequestsMadeItem } from "../block/RequestsMadeItem";
import { useQuery } from "@apollo/client";
import { REQUESTS_MADE } from "../../operations/queries/requestsMade";

export const RequestsMadeList = ({ blocks }) => {
  const { loading, error, data } = useQuery(REQUESTS_MADE, {
    variables: { userId: "Google_111918078641246610063" },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {data.blocks.map((block) => (
        <RequestsMadeItem key={block.id} block={block} />
      ))}
    </>
  );
};
