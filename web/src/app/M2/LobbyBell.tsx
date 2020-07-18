import React from "react"
import { Block } from "models/interface"
import moment from "moment"
import { stringHashBucket } from "utils/common"
import { usersToString } from "utils/user"
import { Placeholder } from "rsuite"
import styled from "styled-components"
import tw from "tailwind.macro"

export interface LobbyBellProps {
  whose: "mine" | "others"
  block: Block
}
const LobbyBellRaw: React.FC<LobbyBellProps> = ({ block, whose }) => {
  const bellColor = `bg-bell-${stringHashBucket(block.id, 10)}`

  return (
    <div className="flex flex-col bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 active:bg-gray-100 duration-300">
      <div className={`px-6 py-2 mb-8 rounded-t-lg ${bellColor}`}>
        <h5 className="overflow-hidden truncate">
          {block.name || <Placeholder.Paragraph rows={1} />}
        </h5>
        <div>{moment(block.created_at).fromNow()}</div>
        <div>{usersToString(block)}</div>
      </div>
      {whose === "mine" && (
        <div className="relative w-auto mx-6 bg-white border bg-none border-light rounded-md h-36">
          <h6 className="p-2 m-6 overflow-hidden text-center truncate">
            {block.name || <Placeholder.Paragraph rows={1} />}
          </h6>
          <div className="text-sm text-right right-6">
            Requested by: {usersToString(block)}
          </div>
        </div>
      )}
      <div className="content-end m-4 mb-2 text-lg card-footer">
        <a href="#" className="underline TODO">
          Facilities
        </a>
      </div>
    </div>
  )
}

const LobbyBell = styled(LobbyBellRaw)``
export { LobbyBell }
