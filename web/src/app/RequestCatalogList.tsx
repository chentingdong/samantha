import React from "react"
import { RequestItem } from "./RequestItem"
import { REQUEST_CATALOG } from "../operations/queries/requestCatalog"
import { ItemOrigin, EditMode, Typename } from "../models/enum"
import { useQuery } from "@apollo/client"
import { BlockDef } from "../models/interface"
import { Error } from "../components/Misc"
import { Divider, Loader } from "rsuite"
import { CatalogDropdown } from "./CatalogDropdown"

const RequestCatalogList = ({ className = "" }) => {
  const { loading, error, data } = useQuery(REQUEST_CATALOG, {
    fetchPolicy: "network-only",
    // pollInterval: 1000,
  })

  if (loading) return <Loader speed="fast" content="Loading..." />
  if (error) return <Error message={error.message} />
  if (!data) return <></>

  return (
    <div className={`request-catalog-list ${className}`}>
      <CatalogDropdown
        title="Add a Bell Definition from..."
        trigger={["click", "hover"]}
        noCaret
        placement="rightStart"
        editingTypename={Typename.blockDefs}
      />
      <Divider />
      {data.blockDefs.map((blockDef: BlockDef, index: number) => (
        <RequestItem
          block={blockDef}
          key={blockDef.id}
          itemOrigin={ItemOrigin.Catalog}
          className={`request-item-${index}`}
        />
      ))}
    </div>
  )
}

export { RequestCatalogList }
