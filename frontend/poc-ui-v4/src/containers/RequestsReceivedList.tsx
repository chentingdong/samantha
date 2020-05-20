import React, { useContext } from "react"
import { useQuery } from "@apollo/client"
import { Context } from "../context/store"
import { REQUESTS_RECEIVED } from "../operations/queries/requestsReceived"
import { RequestItem } from "../components/RequestItem"
import { ItemOrigin } from "../models/enum"
import { useMutation } from "@apollo/client";
import { CREATE_ONE_BLOCK } from "../operations/mutations/createOneBlock"
import { UPDATE_ONE_BLOCK } from "../operations/mutations/updateOneBlock"
import { COMPLETE_ONE_BLOCK } from "../operations/mutations/completeOneBlock"

const RequestsReceivedList = () => {
  const { state, dispatch } = useContext(Context)
  const [createOneBlock] = useMutation(CREATE_ONE_BLOCK)
  const [updateOneBlock] = useMutation(UPDATE_ONE_BLOCK)
  const [completeOneBlock] = useMutation(COMPLETE_ONE_BLOCK)

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
          <div className="m-3" key={block.id}>
            <RequestItem block={block} itemOrigin={ItemOrigin.Received}
            actions={{ createOneBlock, updateOneBlock, completeOneBlock}} />
          </div>
        ))}
    </div>
  )
}

export { RequestsReceivedList }
