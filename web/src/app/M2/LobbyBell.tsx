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
      <div className="card-header rounded-t-lg px-6 py-2 mb-8">
        <h5 className="overflow-hidden truncate">
          {block.name || <Placeholder.Paragraph rows={1} />}
        </h5>
        <div>{moment(block.created_at).fromNow()}</div>
        <div>{usersToString(block)}</div>
      </div>
      {whose === "mine" && (
        <div className="card-body mx-6 w-auto relative bg-none border border-light bg-white rounded-md h-36">
          <h6 className="text-center m-6 p-2 overflow-hidden truncate">
            {block.name || <Placeholder.Paragraph rows={1} />}
          </h6>
          <div className="right-6 text-right text-sm">
            Requested by: {usersToString(block)}
          </div>
        </div>
      )}
      <div className="card-footer text-lg m-4 mb-2">
        <a href="#" className="underline">
          Facilities
        </a>
      </div>
    </Card>
  )
}

export { LobbyBell }
