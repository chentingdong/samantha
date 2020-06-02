import React from "react"
import { useQuery } from "@apollo/client"
import { REQUESTS_RECEIVED } from "../operations/queries/requestsReceived"
import { RequestItem } from "./RequestItem"
import { ItemOrigin } from "../models/enum"
import { useMutation } from "@apollo/client"
import { CREATE_ONE_BLOCK } from "../operations/mutations/createOneBlock"
import { UPDATE_ONE_BLOCK } from "../operations/mutations/updateOneBlock"
import { COMPLETE_ONE_BLOCK } from "../operations/mutations/completeOneBlock"
import { Loading, Error } from "./Misc"
import { AUTH_USER } from "../operations/queries/authUser"
import { Loader } from "rsuite"

const RequestsReceivedList = () => {
  const { data: authUserResult } = useQuery(AUTH_USER)
  const [createOneBlock] = useMutation(CREATE_ONE_BLOCK)
  const [updateOneBlock] = useMutation(UPDATE_ONE_BLOCK)
  const [completeOneBlock] = useMutation(COMPLETE_ONE_BLOCK)

  const { loading, error, data } = useQuery(REQUESTS_RECEIVED, {
    variables: { userId: authUserResult?.authUser?.id },
    fetchPolicy: "network-only",
  })

  if (loading) return <Loader speed="fast" content="Loading..." />
  if (error) return <Error message={error.message} />

  return (
    <>
      {data.blocks?.map((block) => (
        <RequestItem
          block={block}
          key={block.id}
          itemOrigin={ItemOrigin.Received}
          actions={{ createOneBlock, updateOneBlock, completeOneBlock }}
        />
      ))}
    </>
  )
}

export { RequestsReceivedList }
