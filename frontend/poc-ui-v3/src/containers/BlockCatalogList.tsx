import React from "react"
import { BlockCatalogItem } from "../components/BlockCatalogItem"
import { useQuery } from "@apollo/client"
import { BLOCK_CATALOG } from "../operations/queries/blockCatalog"
import { BlockDef } from "../models/interface"
import { DndSourceBox } from "../components/DndSourceBox"
import { Loading, Error } from "../components/Misc"

const BlockCatalogList = () => {
  const { loading, error, data } = useQuery(BLOCK_CATALOG)
  const blockCatalog = data ? data.blockDefs : []

  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  return (
    <div>
      <h2>Block Palette:</h2>
      <small className="row">
        {blockCatalog &&
          blockCatalog.map((blockDef: BlockDef) => {
            return (
              <div className="p-2 col-6" key={blockDef.id}>
                <div className="card">
                  <DndSourceBox type="block" block={blockDef}>
                    <div className="card">
                      <strong className="card-header">{blockDef.name}</strong>
                      <div className="card-body">{blockDef.description}</div>
                    </div>
                  </DndSourceBox>
                </div>
              </div>
            )
          })}
      </small>
    </div>
  )
}

export { BlockCatalogList }
