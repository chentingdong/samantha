import React from "react"
import { GET_BELL } from "operations/subscriptions/getBell"
import { useQuery, useSubscription } from "@apollo/client"
import { BellContext } from "./BellContext"
import { GoalList } from "./GoalList"
import { Bell as BellProps } from "operations/interface/Bell"
import { TaskList } from "./TaskList"
import { GoalTaskList } from "./GoalTaskList"
import { MainMenu } from "./MainMenu"
import { Loading, Error } from "components/Misc"
import styled from "styled-components"
import { displayDate } from "utils/common"
import { displayUsers, iAmInitiator } from "utils/user"
import { BellStateIcon } from "components/StateIcon"
import { AUTH_USER } from "operations/queries/authUser"

const BellHeader: React.FC<{ bell: BellProps }> = ({ bell, ...props }) => {
  const bellhop = bell?.bellhop_participations[0].bellhop
  return (
    <div className="mb-8 header">
      <div className="flex flex-row justify-between pb-1 border-b">
        <h4 className="">{bell?.name}</h4>
        <div className="py-2 italic align-baseline">{bellhop?.name}</div>
      </div>
      <div className="flex flex-row justify-between my-4">
        <div className="text-sm">
          <div>Started at {displayDate(bell?.updated_at)}</div>
          <div>Started by {displayUsers(bell?.user_participations)}</div>
          <div className="my-4">{bell?.description}</div>
        </div>
        <BellStateIcon
          state={bell?.state}
          className="flex-none w-12 h-12 p-2 bg-green-400"
        />
      </div>
    </div>
  )
}

interface BellRawProps {}

const BellRaw: React.FC<BellRawProps> = (props) => {
  const { data: authUserResult } = useQuery(AUTH_USER)
  const authUser = authUserResult.authUser
  const bellId = props?.computedMatch?.params.bellId
  const details = props?.computedMatch?.params.details

  const { data: bellData, loading, error } = useSubscription(GET_BELL, {
    variables: {
      id: bellId,
    },
  })

  if (loading) return <Loading className="text-center" />
  if (error) return <Error className="text-center" message={error.message} />

  const bell = bellData.m2_bells_by_pk
  const tasks = bell?.blocks.filter((block) => block.type === "Task")
  const goals = bell?.blocks.filter(
    (block) => block.type === "Goal" || block.type === "Executor"
  )
  const notifications = bell?.blocks.filter(
    (block) => block.type === "Notification"
  )
  const participants = bell?.user_participations
  const asInitiator = iAmInitiator(authUser, participants)

  return (
    <div>
      <MainMenu className="flex-none" />

      <div className="bell-context grid grid-cols-1 lg:grid-cols-3 gap-0">
        <div className="mx-4 mb-8 col-span-1 lg:col-span-2">
          <BellHeader bell={bell} />
          {asInitiator && <TaskList tasks={tasks} />}
          {!asInitiator && !details && (
            <GoalList
              goals={goals}
              tasks={tasks}
              notifications={notifications}
            />
          )}
          {!asInitiator && details && (
            <GoalTaskList goals={goals} tasks={tasks} />
          )}
        </div>
        <div className="col-span-1">
          <BellContext bell={bell} {...props} />
        </div>
      </div>
    </div>
  )
}

const Bell = styled(BellRaw)`
  &.bell-content {
  }
`
export { Bell }
