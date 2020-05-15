import React from "react";
import { RequestCatalogItem } from "../block/RequestCatalogItem";
import { useQuery } from "@apollo/client";
import { REQUEST_CATALOG } from "../../operations/queries/requestCatalog";

export const RequestCatalogList = () => {
  const { loading, error, data } = useQuery(REQUEST_CATALOG);

  if (loading) return <>Loading...</>;
  if (error) return <>{`Error! ${error.message}`}</>;

  return (
    <div>
      {data.blocks &&
        data.blocks.map((block) => (
          <RequestCatalogItem key={block.id} block={block} />
        ))}
    </div>
  );
};
