import React from "react"
import { Bell } from "models/interface"
import { Link } from "react-router-dom"
import styled from "styled-components"
import tw from "tailwind.macro"
import { stringHashBucket, displayDate } from "utils/common"
import { Placeholder } from "rsuite"
import { Button } from "components/Button"

export interface BellRawProps {
  bell: Bell
  whose?: string
  className?: string
}

const BellItemCardRaw: React.FC<BellRawProps> = ({
  bell,
  whose,
  className,
  ...props
}) => {
  const bellColor = `bg-bell-${stringHashBucket(bell.id, 10)}` || "bg-bell"

  return (
    <Link
      className={`${className} rounded-lg text-sm van-gogh`}
      {...props}
      to={`/bells/${bell.id}`}
    >
      <div className={`${bellColor} card-header`}>
        <h5 className="mb-2 overflow-hidden truncate">
          {bell.name || <Placeholder.Paragraph rows={1} rowHeight={20} />}
        </h5>
        <div>{displayDate(bell.createdAt)}</div>
        <div>Started by [bell.started_by]</div>
      </div>
      {whose === "mine" && (
        <div className="relative w-auto m-6 bg-white border bg-none border-light rounded-md h-36">
          <h6 className="p-2 m-6 overflow-hidden text-center truncate">
            {bell.name || <Placeholder.Paragraph rows={1} rowHeight={20} />}
          </h6>
          <div className="m-2 text-sm text-right right-6">
            Requested by: [bell.created_by]
          </div>
        </div>
      )}
      <div className="m-2 text-lg card-footer">Facilities</div>
    </Link>
  )
}
const BellItemCard = styled(BellItemCardRaw)`
  & {
    ${tw`bg-gray-200 overflow-hidden cursor-pointer`}
    &:hover {
      ${tw`hover:bg-gray-200 active:bg-gray-200`}
    }
    .card-header,
    .card-body,
    .card-footer {
      ${tw`p-4`}
    }
  }
`

export interface BellItemRowProps {
  bell: Bell
}

const BellItemRow: React.FC<BellItemRowProps> = ({ bell }) => {
  return (
    bell && (
      <ul className="px-8 py-0 rounded-full cursor-pointer grid grid-cols-7 hover:bg-gray-3200">
        <li className="self-center break-all col-span-2">
          {bell.name || <Placeholder.Paragraph rows={1} rowHeight={20} />}
        </li>
        <li className="self-center break-all col-span-4">
          {bell.description || (
            <Placeholder.Paragraph rows={1} rowHeight={14} />
          )}
        </li>
        <li className="flex flex-row-reverse self-center col-span-1">
          <Link to={`/bells/${bell.id}`}>
            <Button color="primary" className="fill">
              Start
            </Button>
          </Link>
        </li>
      </ul>
    )
  )
}

export { BellItemCard, BellItemRow }
