import React from "react"
import { RequestItem } from "./RequestItem"
import { REQUEST_CATALOG } from "../operations/queries/requestCatalog"
import { ItemOrigin } from "../models/enum"
import { useQuery, useMutation, useApolloClient } from "@apollo/client"
import { CREATE_ONE_BLOCK } from "../operations/mutations/createOneBlock"
import { UPDATE_ONE_BLOCK } from "../operations/mutations/updateOneBlock"
import { COMPLETE_ONE_BLOCK } from "../operations/mutations/completeOneBlock"
import { BlockDef } from "../models/interface"
import { Loading, Error } from "./Misc"
import { Button, Divider } from "rsuite"
import { setUiState } from "../operations/mutations/setUiState"
import { CatalogDropdown } from "./CatalogDropdown"

const RequestCatalogList = () => {
  const [createOneBlock] = useMutation(CREATE_ONE_BLOCK)
  const [updateOneBlock] = useMutation(UPDATE_ONE_BLOCK)
  const [completeOneBlock] = useMutation(COMPLETE_ONE_BLOCK)
  const { loading, error, data } = useQuery(REQUEST_CATALOG)

  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  return (
    <>
      <CatalogDropdown
        title="+ Add a Request Definition from"
        trigger={["click", "hover"]}
        noCaret
        placement="rightStart"
      />
      <Divider />
      {data.blockDefs?.map((blockDef: BlockDef) => (
        <RequestItem
          block={blockDef}
          key={blockDef.id}
          itemOrigin={ItemOrigin.Catalog}
          actions={{ createOneBlock, updateOneBlock, completeOneBlock }}
        />
      ))}
    </>
  )
}

export { RequestCatalogList }
