import React from "react"
import { BlockCatalogItem } from "./BlockCatalogItem"
import { useQuery } from "@apollo/client"
import { BLOCK_CATALOG } from "../operations/queries/blockCatalog"
import { BlockDef } from "../models/interface"
import { Loading, Error } from "../components/Misc"
import { Loader } from "rsuite"

const BlockCatalogList = () => {
  const { loading, error, data } = useQuery(BLOCK_CATALOG)

  if (loading) return <Loader speed="fast" content="Loading..." />
  if (error) return <Error message={error.message} />

  return (
    <div>
      <h2>Block Catalog</h2>
      <div className="grid grid-cols-2 gap-1">
        {data.blockDefs?.map((blockDef: BlockDef) => {
          return <BlockCatalogItem blockDef={blockDef} key={blockDef.id} />
        })}
      </div>
    </div>
  )
}

export { BlockCatalogList }