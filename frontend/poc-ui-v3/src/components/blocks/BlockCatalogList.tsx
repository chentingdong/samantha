import React from "react";
import { BlockCatalogItem } from "../block/BlockCatalogItem";
import { useQuery } from "@apollo/client";
import { BLOCK_CATALOG } from "../../operations/queries/blockCatalog";

export const BlockCatalogList = () => {
  const { loading, error, data } = useQuery(BLOCK_CATALOG);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {data.blocks.map((block) => (
        <BlockCatalogItem key={block.id} block={block} />
      ))}
    </>
  );
};
