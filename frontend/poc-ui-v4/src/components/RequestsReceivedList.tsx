import React from "react"
import { useQuery } from "@apollo/client"
import { REQUESTS_RECEIVED } from "../operations/queries/requestsReceived"
import { RequestItem } from "./RequestItem"
import { ItemOrigin } from "../models/enum"
import { Error } from "./Misc"
import { AUTH_USER } from "../operations/queries/authUser"
import { Loader } from "rsuite"

const RequestsReceivedList = () => {
  const { data: authUserResult } = useQuery(AUTH_USER)

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
        />
      ))}
    </>
  )
}

export { RequestsReceivedList }
