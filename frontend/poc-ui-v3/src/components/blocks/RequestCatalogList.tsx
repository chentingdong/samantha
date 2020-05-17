import React from "react"
import { RequestItem } from "../block/RequestItem"
import { useQuery } from "@apollo/client"
import { REQUEST_CATALOG } from "../../operations/queries/requestCatalog"
import { ItemOrigin } from "../context/enum"

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
            <RequestItem
              key={block.id}
              block={block}
              itemOrigin={ItemOrigin.Catalog}
            />
          </div>
        ))}
    </div>
  )
}

export { RequestCatalogList }
