import * as React from "react"
import { useQuery, useSubscription } from "@apollo/client"
import { AUTH_USER } from "operations/queries/authUser"
import { REQUESTS_RECEIVED } from "operations/subscriptions/requestsReceived"
import { Loader, Placeholder } from "rsuite"
import { Error } from "components/Misc"
import { BlockDef } from "models/interface"
import { Block } from "models/interface"
import { Card } from "components"
import { BellSearch } from "./BellSearch"
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
    <div>
      <BellSearch />
      <div
        className={
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-12 p-24"
        }
        {...props}
      >
        {data.blocks.map((block: BlockDef, index: number) => (
          <LobbyBellCard key={block.id} block={block} index={index} />
        ))}
      </div>
    </div>
  )
}

interface LobbyBellCardProps {
  block: Block
  index: number
}
const LobbyBellCard: React.FC<LobbyBellCardProps> = ({ block, index }) => {
  const usersToString = (block: Block) => {
    // TODO: bell
    return block.requestors?.map((user) => "@" + user.user.name).join(", ")
  }
  return (
    <Card
      className="bg-primary"
      color={`bell-${stringHashBucket(block.id, 10)}`}
    >
      <div className="card-header">
        <h5 className="overflow-hidden truncate">
          {block.name || <Placeholder.Paragraph rows={1} />}
        </h5>
        <div>{moment(block.created_at).fromNow()}</div>
        <div>{usersToString(block)}</div>
      </div>
      <div className="card-body m-8 w-auto pb-20 border relative bg-none">
        <h6 className="text-center m-8">
          {block.name || <Placeholder.Paragraph rows={1} />}
        </h6>
        <div className="text-sm text-right absolute bottom-0 text-sm right-0">
          <i>Requested by: {usersToString(block)}</i>
        </div>
      </div>
      <div className="card-footer">
        <a href="#" className="underline">
          Facilities
        </a>
      </div>
    </Card>
  )
}
