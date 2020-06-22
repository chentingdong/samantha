import React from "react"
import { useQuery, useSubscription } from "@apollo/client"
import { REQUESTS_RECEIVED } from "../operations/subscriptions/requestsReceived"
import { RequestItem } from "./RequestItem"
import { ItemOrigin } from "../models/enum"
import { Error } from "../components/Misc"
import { AUTH_USER } from "../operations/queries/authUser"
import { Loader } from "rsuite"
import { BlockDef } from "../models/interface"

const RequestsReceivedList = ({ className = "" }) => {
  const { data: authUserResult } = useQuery(AUTH_USER)

  const { loading, error, data } = useSubscription(REQUESTS_RECEIVED, {
    variables: { userId: authUserResult?.authUser?.id },
  })

  if (loading) return <Loader speed="fast" content="Loading..." />
  if (error) return <Error message={error.message} />
  if (!data || !authUserResult) return <></>

  return (
    <div
      className={`requests-received-list ${className} grid grid-cols-2 gap-4`}
    >
      {data.blocks.map((block: BlockDef, index: number) => (
        <RequestItem
          block={block}
          key={block.id}
          itemOrigin={ItemOrigin.Received}
          className={`requests-received-${index} col-span-2 xl:col-span-1`}
        />
      ))}
    </div>
  )
}

export { RequestsReceivedList }
