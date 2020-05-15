import React from "react";
import { BlockCatalogItem } from "../block/BlockCatalogItem";
import { useQuery } from "@apollo/client";
import { BLOCK_CATALOG } from "../../operations/queries/blockCatalog";
import { Block } from "../context/interface";
import { DndSourceBox } from "../block/dnd-source-box";

export const BlockCatalogList = () => {
  const { loading, error, data } = useQuery(BLOCK_CATALOG);

  if (loading) return <>Loading...</>;
  if (error) return <>{`Error! ${error.message}`}</>;

  return (
    <div>
      <h2>Block Palette</h2>
      <small className="row">
        {data.blocks &&
          data.blocks.map((block: Block) => {
            return (
              <div className="col-6 p-2">
                <div className="card p-0" key={block.id}>
                  <DndSourceBox type="block" block={block}>
                    <div className="card">
                      <strong className="card-header">{block.name}</strong>
                      <div className="card-body">{block.description}</div>
                    </div>
                  </DndSourceBox>
                </div>
              </div>
            );
          })}
      </small>
    </div>
  );
};
