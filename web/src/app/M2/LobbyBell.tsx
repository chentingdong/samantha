import React from "react"
import { Block } from "models/interface"
import { Card } from "components"
import moment from "moment"
import { stringHashBucket } from "utils/Styles"
import { Placeholder } from "rsuite"

interface LobbyBellProps {
  block: Block
}
const LobbyBell: React.FC<LobbyBellProps> = ({ block }) => {
  const usersToString = (block: Block) => {
    return block.requestors?.map((user) => "@" + user.user.name).join(", ")
  }
  return (
    <Card
      className="bg-primary bg-gray-100 rounded-lg cursor-pointer"
      color={`bell-${stringHashBucket(block.id, 10)}`}
    >
      <div className="card-header rounded-t-lg py-4 px-6">
        <h5 className="overflow-hidden truncate">
          {block.name || <Placeholder.Paragraph rows={1} />}
        </h5>
        <div>{moment(block.created_at).fromNow()}</div>
        <div>{usersToString(block)}</div>
      </div>
      <div className="card-body my-8 mx-6 mb-16 h-32 w-auto relative bg-none border border-light overflow-x-hidden truncate">
        <h6 className="text-center m-8">
          {block.name || <Placeholder.Paragraph rows={1} />}
        </h6>
        <div className="text-right absolute bottom-0 m-2 text-sm right-0">
          <i>Requested by: {usersToString(block)}</i>
        </div>
      </div>
      <div className="card-footer my-2 mx-4 text-lg">
        <a href="#" className="underline">
          Facilities
        </a>
      </div>
    </Card>
  )
}

export { LobbyBell }
