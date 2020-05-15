import React, { useContext } from "react"
import { RequestsReceivedItem } from "../block/RequestsReceivedItem"
import { useQuery } from "@apollo/client"
import { Context } from "../context/store"
import { REQUESTS_RECEIVED } from "../../operations/queries/requestsReceived"

const RequestsReceivedList = () => {
  const { state, dispatch } = useContext(Context)

  const { loading, error, data } = useQuery(REQUESTS_RECEIVED, {
    variables: { userId: state.user.id },
  })
  const requestReceived = data ? data.blocks : []

  if (loading) return <>Loading...</>
  if (error) return <>{`Error! ${error.message}`}</>

  return (
    <div>
      {requestReceived &&
        requestReceived.map((block) => (
          <RequestsReceivedItem key={block.id} block={block} />
        ))}
    </div>
  )
}

export { RequestsReceivedList }
