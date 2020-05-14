import React from "react";
import { RequestCatalogSummary } from "../block/RequestCatalogSummary";
import { gql, useQuery } from "@apollo/client";

const REQUEST_CATALOG = gql`
  query REQUEST_CATALOG {
    blocks(
      orderBy: { id: asc }
      where: {
        AND: [
          { inCatalog: { equals: true } }
          { OR: [{ type: COMPOSITE_PARALLEL }, { type: COMPOSITE_SEQUENTIAL }] }
        ]
      }
    ) {
      id
      name
      parent {
        id
      }
      state
      type
      inCatalog
      requestors {
        name
      }
      responders {
        name
      }
    }
  }
`;

export const RequestCatalogList = ({ blocks }) => {
  const { loading, error, data } = useQuery(REQUEST_CATALOG);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {data.blocks.map((block) => (
        <RequestCatalogSummary block={block} />
      ))}
    </>
  );
};
