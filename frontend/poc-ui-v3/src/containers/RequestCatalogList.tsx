import React from "react"
import { RequestItem } from "../components/RequestItem"
import { useQuery } from "@apollo/client"
import { REQUEST_CATALOG } from "../operations/queries/requestCatalog"
import { ItemOrigin } from "../models/enum"
import { useMutation } from "@apollo/client"
import { CREATE_ONE_BLOCK } from "../operations/mutations/createOneBlock"
import { UPDATE_ONE_BLOCK } from "../operations/mutations/updateOneBlock"
import { COMPLETE_ONE_BLOCK } from "../operations/mutations/completeOneBlock"
import { BlockDef } from "../models/interface"
import { Loading, Error } from "../components/Misc"

const RequestCatalogList = () => {
  const [createOneBlock] = useMutation(CREATE_ONE_BLOCK)
  const [updateOneBlock] = useMutation(UPDATE_ONE_BLOCK)
  const [completeOneBlock] = useMutation(COMPLETE_ONE_BLOCK)
  const { loading, error, data } = useQuery(REQUEST_CATALOG)

  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  return (
    <>
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
