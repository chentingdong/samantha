import React from "react"
import { useQuery } from "@apollo/client"
import { REQUESTS_RECEIVED } from "../operations/queries/requestsReceived"
import { RequestItem } from "./RequestItem"
import { ItemOrigin } from "../models/enum"
import { Error } from "../components/Misc"
import { AUTH_USER } from "../operations/queries/authUser"
import { Loader } from "rsuite"
import { BlockDef } from "../models/interface"

const RequestsReceivedList = ({ className = "" }) => {
  const { data: authUserResult } = useQuery(AUTH_USER)

  const { loading, error, data } = useQuery(REQUESTS_RECEIVED, {
    variables: { userId: authUserResult?.authUser?.id },
    fetchPolicy: "network-only",
    pollInterval: 1000,
  })

  if (loading) return <Loader speed="fast" content="Loading..." />
  if (error) return <Error message={error.message} />
  if (!data || !authUserResult) return <></>

  return (
    <div className={`requests-received-list ${className}`}>
      {data.Block.map((block: BlockDef, index: number) => (
        <RequestItem
          block={block}
          key={block.id}
          itemOrigin={ItemOrigin.Received}
          className={`requests-received-${index}`}
        />
      ))}
    </div>
  )
}

export { RequestsReceivedList }
