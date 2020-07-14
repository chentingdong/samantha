import * as React from "react"
import { useQuery, useSubscription } from "@apollo/client"
import { AUTH_USER } from "operations/queries/authUser"
import { REQUESTS_RECEIVED } from "operations/subscriptions/requestsReceived"
import { Loader } from "rsuite"
import { Error } from "components/Misc"
import { BlockDef } from "models/interface"
import { Block } from "models/interface"
import { Card } from "components"
import moment from "moment"
import { stringHashBucket } from "utils/Styles"

export interface LobbyProps {}

export const Lobby: React.FC<LobbyProps> = (props) => {
  const { data: authUserResult } = useQuery(AUTH_USER)
  const { loading, error, data } = useSubscription(REQUESTS_RECEIVED, {
    variables: { userId: authUserResult?.authUser?.id },
  })
  if (loading) return <Loader speed="fast" content="Loading..." />
  if (error) return <Error message={error.message} />
  if (!data || !authUserResult) return <></>

  return (
    <div
      className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}
      {...props}
    >
      {data.blocks.map((block: BlockDef, index: number) => (
        <LobbyBellCard key={block.id} block={block} index={index} />
      ))}
    </div>
  )
}

interface LobbyBellCardProps {
  block: Block
  index: number
}
const LobbyBellCard: React.FC<LobbyBellCardProps> = ({ block, index }) => {
  const usersToString = (block: Block) => {
    return block.requestors?.map((user) => "@" + user.user.name).join(", ")
  }
  return (
    <Card color={`bell-${stringHashBucket(block.id, 10)}`}>
      <div className="card-header">
        <h5 className="overflow-hidden truncate">{block.name || "..."}</h5>
        <p>{moment(block.created_at).fromNow()}</p>
        <p>Bell started by: {usersToString(block)}</p>
      </div>
      <div className="card-body m-8 w-auto pb-20">
        <h6>{block.name || "..."}</h6>
        <p>{block.description}</p>
        <p className="text-sm text-right">
          Requested by: {usersToString(block)}
        </p>
      </div>
      <div className="card-footer">
        <a href="#" className="underline">
          Facilities
        </a>
      </div>
    </Card>
  )
}
