import React from "react"
import {GET_BELL} from "operations/subscriptions/getBell"
import {useQuery, useSubscription} from "@apollo/client"
import {BellContext} from "./BellContext"
import {GoalList} from "./GoalList"
import {Bell as BellProps} from "operations/interface"
import {TaskList} from "./TaskList"
import {GoalTaskList} from "./GoalTaskList"
import {Loading, Error} from "components/Misc"
import styled from "styled-components"
import {displayDate} from "utils/common"
import {displayParticipants, iPlayRoles} from "utils/user"
import {BellStateIcon} from "components/StateIcon"
import {AUTH_USER} from "operations/queries/authUser"
import tw from "tailwind.macro"
import {getRouteParams} from "utils/router"
import {useLocation} from "react-router-dom"

const BellHeader: React.FC<{bell: BellProps; className?: string}> = ({
  bell,
  ...props
}) => {
  const bellhop = bell?.bellhop_participations[0].bellhop
  const userInitiators = bell?.user_participations.filter(
    (participant) => participant.role === "bell_initiator"
  )

  const bellhopInitiators = bell?.bellhop_participations.filter(
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

const BellRaw: React.FC<BellRawProps> = ({className, ...props}) => {
  const location = useLocation()
  const params = getRouteParams(location)

  const {data: authUserResult, loading: loadingUser} = useQuery(AUTH_USER)
  const {data: bellData, loading: loadingBell, error} = useSubscription(
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
export {Bell}
