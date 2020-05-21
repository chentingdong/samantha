import React from "react"
import { BlockCatalogItem } from "./BlockCatalogItem"
import { useQuery } from "@apollo/client"
import { BLOCK_CATALOG } from "../operations/queries/blockCatalog"
import { BlockDef } from "../models/interface"
import { DndSourceBox } from "./DndSourceBox"
import { Loading, Error } from "./Misc"

const BlockCatalogList = () => {
  const { loading, error, data } = useQuery(BLOCK_CATALOG)

  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  return (
    <div>
      <h2>Block Palette:</h2>
      <small className="row">
        {data.blockDefs?.map((blockDef: BlockDef) => {
          return <BlockCatalogItem blockDef={blockDef} key={blockDef.id} />
        })}
      </small>
    </div>
  )
}

export { BlockCatalogList }
