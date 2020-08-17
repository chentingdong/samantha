import { Link, useHistory, useLocation } from "react-router-dom"
import { buildRouterUrl, getRouteParams } from "utils/router"
import { displayDate, stringHashBucket } from "utils/common"

import { Bell } from "models/interface"
import { Button } from "components/Button"
import { CLONE_BELL_BY_PK } from "operations/mutations/cloneBellByPk"
import { Placeholder } from "rsuite"
import React from "react"
import { displayParticipants } from "utils/user"
import styled from "styled-components"
import tw from "tailwind.macro"
import { useMutation } from "@apollo/client"

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
  const bellColor = `bg-bell-${stringHashBucket(bell?.id, 10)}` || "bg-bell"
  const initiators = bell?.user_participations?.filter(
    (participant) => participant.role === "bell_initiator"
  )
  const bellhops = bell?.bellhop_participations
  return (
    <Link
      className={`${className} rounded-lg text-sm van-gogh`}
      {...props}
      to={buildRouterUrl({ menu: "bells", bellId: bell.id })}
    >
      <div className={`${bellColor} card-header`}>
        <h5 className="mb-2 overflow-hidden truncate">
          {bell?.name || <Placeholder.Paragraph rows={1} rowHeight={20} />}
        </h5>
        <div>{displayDate(bell?.created_at)}</div>
        <div>
          Started by <i>{displayParticipants(initiators)}</i>
        </div>
      </div>
      {whose === "mine" && (
        <div className="relative w-auto m-6 bg-white border bg-none border-light rounded-md h-36">
          <h6 className="p-2 m-6 overflow-hidden text-center truncate">
            {bell?.name || <Placeholder.Paragraph rows={1} rowHeight={20} />}
          </h6>
          <div className="m-2 text-sm text-right right-6">
            Requested by: <i>{displayParticipants(initiators)}</i>
          </div>
        </div>
      )}
      <div className="m-2 text-lg card-footer">
        {displayParticipants(bellhops)}
      </div>
    </Link>
  )
}
const BellItemCard = styled(BellItemCardRaw)`
  & {
    ${tw`bg-gray-200 overflow-hidden cursor-pointer no-underline`}
    &:hover {
      ${tw`hover:bg-gray-200 active:bg-gray-200 no-underline`}
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
  const location = useLocation()
  const params = getRouteParams(location.pathname)
  const history = useHistory()

  const [cloneBellByPk] = useMutation(CLONE_BELL_BY_PK)
  const startABell = async () => {
    const newBell = await cloneBellByPk({
      variables: {
        id: bell.id,
        is_definition: false,
        start_on_create: true,
      },
    })
    const newBellUrl = buildRouterUrl({
      menu: "bells",
      bellId: newBell.data.action,
    })
    console.log(newBell)
    // history.push(newBellUrl)
  }
  return (
    bell && (
      <div className="px-4 py-2 rounded-full cursor-pointer flex justify-between hover:bg-gray-200 align-middle">
        <div className="align-middle">
          <div className="py-1">
            {bell?.name || <Placeholder.Paragraph rows={1} rowHeight={20} />}
          </div>
          <div className="text-sm ">
            {bell?.description || (
              <Placeholder.Paragraph rows={1} rowHeight={14} />
            )}
          </div>
        </div>
        <div className="flex-none">
          <Button color="primary" className="fill" onClick={startABell}>
            Start
          </Button>
        </div>
      </div>
    )
  )
}

export { BellItemCard, BellItemRow }
