import React from "react"
import { Block } from "models/interface"
import { Card } from "components"
import moment from "moment"
import { stringHashBucket } from "utils/styles"
import { usersToString } from "utils/user"
import { Placeholder } from "rsuite"

export interface LobbyBellProps {
  whose: "mine" | "others"
  block: Block
}
const LobbyBell: React.FC<LobbyBellProps> = ({ block, whose }) => {
  return (
    <Card
      className="bg-gray-200 hover:bg-gray-300 active:bg-gray-100 rounded-lg cursor-pointer duration-100"
      color={`bell-${stringHashBucket(block.id, 10)}`}
    >
      <div className="card-header rounded-t-lg py-4 px-6">
        <h5 className="overflow-hidden truncate">
          {block.name || <Placeholder.Paragraph rows={1} />}
        </h5>
        <div>{moment(block.created_at).fromNow()}</div>
        <div>{usersToString(block)}</div>
      </div>
      {whose === "mine" && (
        <div className="card-body my-8 mx-6 h-32 w-auto relative bg-none border border-light overflow-x-hidden truncate bg-white">
          <h6 className="text-center m-8 overflow hidden truncate break-words">
            {block.name || <Placeholder.Paragraph rows={1} />}
          </h6>
          <div className="text-right absolute bottom-0 m-2 text-sm right-0">
            <i>Requested by: {usersToString(block)}</i>
          </div>
        </div>
      )}
      <div className="card-footer text-lg  my-2 mx-4 mt-16">
        <a href="#" className="underline">
          Facilities
        </a>
      </div>
    </Card>
  )
}

export { LobbyBell }
