import { Error, Loading } from "components/Misc"
import { displayParticipants, iPlayRoles } from "utils/user"
import { useQuery, useSubscription } from "@apollo/client"

import { AUTH_USER } from "operations/queries/authUser"
import { BellContext } from "./BellContext"
import { Bell as BellProps } from "models/interface"
import { BellStateIcon } from "components/StateIcon"
import { GET_BELL } from "operations/subscriptions/getBell"
import { GoalList } from "./GoalList"
import { GoalTaskList } from "./GoalTaskList"
import React from "react"
import { TaskList } from "./TaskList"
import { displayDate } from "utils/common"
import { getRouteParams } from "utils/router"
import styled from "styled-components"
import tw from "tailwind.macro"
import { useLocation } from "react-router-dom"

const BellHeader: React.FC<{ bell: BellProps; className?: string }> = ({
  bell,
  ...props
}) => {
  const bellhop = bell?.bellhop_participations?.[0].bellhop
  const userInitiators = bell?.user_participations?.filter(
    (participant) => participant.role === "bell_initiator"
  )

  const bellhopInitiators = bell?.bellhop_participations?.filter(
    (participant) => participant.role === "bell_initiator"
  )

  return (
    <div {...props}>
      <div className="flex flex-row justify-between pb-1 border-b">
        <h4 className="">{bell?.name}</h4>
        <div className="py-2 italic align-baseline">{bellhop?.name}</div>
      </div>
      <div className="flex flex-row justify-between my-4">
        <div className="text-sm">
          <div>Started at: {displayDate(bell?.updated_at)}</div>
          <div>
            <span>Started by: </span>
            {userInitiators && (
              <i>
                {displayParticipants(userInitiators)} (
                {displayParticipants(bellhopInitiators)})
              </i>
            )}
            {!userInitiators && <i>{displayParticipants(bellhopInitiators)}</i>}
          </div>
          <div className="my-4">{bell?.description}</div>
        </div>
        <BellStateIcon
          state={bell?.state}
          className="flex-none w-12 h-12 p-2"
        />
      </div>
    </div>
  )
}

interface BellRawProps {
  className?: string
}

const BellRaw: React.FC<BellRawProps> = ({ className, ...props }) => {
  const location = useLocation()
  const params = getRouteParams(location.pathname)

  const { data: authUserResult, loading: loadingUser } = useQuery(AUTH_USER)
  const { data: bellData, loading: loadingBell, error } = useSubscription(
    GET_BELL,
    {
      variables: {
        id: params.bellId,
      },
    }
  )

  if (loadingUser || loadingBell) return <Loading className="text-center" />
  if (error) return <Error className="text-center" message={error.message} />
  const bell = bellData.m2_bells_by_pk
  const blocks = bell?.blocks
  const tasks = blocks?.filter((block) => block.type === "Task")
  const goals = blocks?.filter(
    (block) => block.type === "Goal" || block.type === "Executor"
  )

  const notifications = blocks?.filter((block) => block.type === "Notification")

  const artifacts = bell?.context?.artifacts
  const asInitiator = iPlayRoles(
    authUserResult.authUser,
    bell?.user_participations,
    ["bell_initiator"]
  )
  return (
    <div className={`${className} grid grid-cols-3 gap-0 h-full`}>
      <div className="h-full ml-4 col-span-2">
        <div className="h-full">
          <BellHeader bell={bell} className="header" />
          <div className="goal-list">
            {asInitiator && <TaskList className="mr-4" tasks={tasks} />}
            {!asInitiator && params.taskId === "all" && (
              <GoalList
                goals={goals}
                tasks={tasks}
                notifications={notifications}
                artifacts={artifacts}
              />
            )}
            {!asInitiator && params.taskId !== "all" && (
              <GoalTaskList
                goals={goals}
                tasks={tasks}
                notifications={notifications}
                artifacts={artifacts}
              />
            )}
          </div>
        </div>
      </div>
      <BellContext className="h-full col-span-1" bell={bell} />
    </div>
  )
}

const Bell = styled(BellRaw)`
  .header {
    ${tw`mb-8 mr-4 bg-white z-10`}
  }
  .goal-list {
  }
`
export { Bell }
