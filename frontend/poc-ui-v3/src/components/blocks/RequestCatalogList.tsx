import React from "react"
import { RequestCatalogItem } from "../block/RequestCatalogItem"
import { useQuery } from "@apollo/client"
import { REQUEST_CATALOG } from "../../operations/queries/requestCatalog"

const RequestCatalogList = () => {
  const { loading, error, data } = useQuery(REQUEST_CATALOG)
  const requestCatalog = data ? data.blocks : []

  if (loading) return <>Loading...</>
  if (error) return <>Error! ${error.message}</>

  return (
    <div>
      {requestCatalog &&
        requestCatalog.map((block) => (
          <div className="m-3">
            <RequestCatalogItem key={block.id} block={block} />
          </div>
        ))}
    </div>
  )
}

export { RequestCatalogList }
