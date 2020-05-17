import React, { useContext } from "react"
import { useQuery } from "@apollo/client"
import { Context } from "../context/store"
import { REQUESTS_RECEIVED } from "../../operations/queries/requestsReceived"
import { RequestCatalogItem } from "../block/RequestCatalogItem"

const RequestsReceivedList = () => {
  const { state, dispatch } = useContext(Context)

  const { loading, error, data } = useQuery(REQUESTS_RECEIVED, {
    variables: { userId: state.user.id },
  })
  const requestReceived = data ? data.blocks : []

  if (loading) return <>Loading...</>
  if (error) return <>Error! ${error.message}</>

  return (
    <div>
      {requestReceived &&
        requestReceived.map((block) => (
          <div className="m-3">
            <RequestCatalogItem key={block.id} block={block} />
          </div>
        ))}
    </div>
  )
}

export { RequestsReceivedList }
