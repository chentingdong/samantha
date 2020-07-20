import React, { useState } from "react"
import { Card } from "components/Card"
import moment from "moment"
import { Bell } from "models/interface"
import styled from "styled-components"
import tw from "tailwind.macro"
import { stringHashBucket } from "utils/common"
import { Placeholder } from "rsuite"
import { usersToString } from "utils/user"
import { Button } from "components/Button"
import { setUiState } from "../../operations/mutations/setUiState"

export interface BellRawProps {
  bell: Bell
  whose?: string
  className?: string
}

const BellCardRaw: React.FC<BellRawProps> = ({
  bell,
  whose,
  className,
  ...props
}) => {
  const bellColor = `bg-bell-${stringHashBucket(bell.id, 10)}`

  return (
    <div className={`${className} rounded-lg`}>
      <div className={`${bellColor} card-header`}>
        <h3 className="">{bell.name || <Placeholder.Paragraph rows={1} />}</h3>
        <div>{moment(bell.createdAt).format("MM/DD hh:mm:ss")}</div>
        <div>by</div>
      </div>
      {whose === "mine" && (
        <div className="relative w-auto m-6 bg-white border bg-none border-light rounded-md h-36">
          <h6 className="p-2 m-6 overflow-hidden text-center truncate">
            {bell.name || <Placeholder.Paragraph rows={1} />}
          </h6>
          <div className="m-2 text-sm text-right right-6">
            Requested by: {usersToString(bell)}
          </div>
        </div>
      )}
      <div className="m-2 card-footer">Facilities</div>
    </div>
  )
}
const BellCard = styled(BellCardRaw)`
  & {
    ${tw`bg-gray-200 overflow-hidden`}
    .card-header,
    .card-body,
    .card-footer {
      ${tw`p-4`}
    }
    .card-header {
    }
  }
`

export interface BellRowProps {
  bell: Bell
}

const BellRow: React.FC<BellRowProps> = ({ bell }) => {
  const startBell = (bell) => {
    console.log(bell.id)
    setUiState({ currentBellId: bell.id })
  }
  return (
    <ul className="px-8 py-0 rounded-full cursor-pointer grid grid-cols-7 hover:bg-gray-300">
      <li className="self-center break-all col-span-2">
        {bell.name || <Placeholder.Paragraph rows={1} />}
      </li>
      <li className="self-center break-all col-span-4">
        {bell.description || <Placeholder.Paragraph rows={1} />}
      </li>
      <li className="flex flex-row-reverse self-center col-span-1">
        <Button
          color="secondary"
          className="fill"
          onClick={(e) => startBell(bell)}
        >
          Start
        </Button>
      </li>
    </ul>
  )
}

export { BellCardRaw, BellCard, BellRow }
