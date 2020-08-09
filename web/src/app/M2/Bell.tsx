import React from "react"
import { GET_BELL } from "operations/subscriptions/getBell"
import { useQuery, useSubscription } from "@apollo/client"
import { BellContext } from "./BellContext"
import { GoalList } from "./GoalList"
import { Bell as BellProps } from "operations/interface"
import { TaskList } from "./TaskList"
import { GoalTaskList } from "./GoalTaskList"
import { MainMenu } from "./MainMenu"
import { Loading, Error } from "components/Misc"
import styled from "styled-components"
import { displayDate } from "utils/common"
import { displayParticipants, iPlayRoles } from "utils/user"
import { BellStateIcon } from "components/StateIcon"
import { AUTH_USER } from "operations/queries/authUser"
import tw from "tailwind.macro"
import { getRouteParams } from "utils/router"
import { useLocation } from "react-router-dom"

const BellHeader: React.FC<{ bell: BellProps }> = ({ bell, ...props }) => {
  const bellhop = bell?.bellhop_participations[0].bellhop
  return (
    <div {...props} className="mb-8 mr-4 header">
      <div className="flex flex-row justify-between pb-1 border-b">
        <h4 className="">{bell?.name}</h4>
        <div className="py-2 italic align-baseline">{bellhop?.name}</div>
      </div>
      <div className="flex flex-row justify-between my-4">
        <div className="text-sm">
          <div>Started at: {displayDate(bell?.updated_at)}</div>
          <div>
            Started by: <i>{displayParticipants(bell?.user_participations)}</i>
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

const BellRaw: React.FC<BellRawProps> = (props) => {
  const location = useLocation()
  const params = getRouteParams(location)

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
  const tasks = bell?.blocks.filter((block) => block.type === "Task")
  const goals = bell?.blocks.filter(
    (block) => block.type === "Goal" || block.type === "Executor"
  )
  const notifications = bell?.blocks.filter(
    (block) => block.type === "Notification"
  )

  const asInitiator = iPlayRoles(
    authUserResult.authUser,
    bell.user_participations,
    ["bell_initiator"]
  )

  return (
    <div className={props.className}>
      <div className="bell-context grid grid-cols-1 lg:grid-cols-3 gap-0">
        <div className="ml-4 overflow-y-auto col-span-1 lg:col-span-2">
          <BellHeader bell={bell} />
          {asInitiator && <TaskList className="mr-4" tasks={tasks} />}
          {!asInitiator && params.taskId === "all" && (
            <GoalList
              goals={goals}
              tasks={tasks}
              notifications={notifications}
            />
          )}
          {!asInitiator && params.taskId !== "all" && (
            <GoalTaskList goals={goals} tasks={tasks} />
          )}
        </div>
        <BellContext className="col-span-1" bell={bell} />
      </div>
    </div>
  )
}

const Bell = styled(BellRaw)`
  .header {
  }
  .bell-context {
    height: calc(100vh - 150px);
    overflow: auto;
  }
`
export { Bell }
