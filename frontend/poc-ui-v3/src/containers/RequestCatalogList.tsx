import React from "react"
import { RequestItem } from "../components/RequestItem"
import { useQuery } from "@apollo/client"
import { REQUEST_CATALOG } from "../operations/queries/requestCatalog"
import { ItemOrigin } from "../models/enum"
import { useMutation } from "@apollo/client"
import { CREATE_ONE_BLOCK } from "../operations/mutations/createOneBlock"
import { UPDATE_ONE_BLOCK } from "../operations/mutations/updateOneBlock"
import { COMPLETE_ONE_BLOCK } from "../operations/mutations/completeOneBlock"
import { Block } from "../models/interface"
import { Loading, Error } from '../components/Misc'

const RequestCatalogList = () => {
  const { loading, error, data } = useQuery(REQUEST_CATALOG)
  const [createOneBlock] = useMutation(CREATE_ONE_BLOCK)
  const [updateOneBlock] = useMutation(UPDATE_ONE_BLOCK)
  const [completeOneBlock] = useMutation(COMPLETE_ONE_BLOCK)
  const requestCatalog = data ? data.blocks : []

  if (loading) return <Loading/>
  if (error) return <Error message={error.message}/>

  return (
    <div>
      {requestCatalog &&
        requestCatalog.map((block: Block) => (
          <div className="m-3" key={block.id}>
            <RequestItem
              block={block}
              itemOrigin={ItemOrigin.Catalog}
              actions={{ createOneBlock, updateOneBlock, completeOneBlock }}
            />
          </div>
        ))}
    </div>
  )
}

export { RequestCatalogList }
