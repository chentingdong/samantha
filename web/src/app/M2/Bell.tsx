import React from "react"
import { Icon } from "rsuite"
import moment from "moment"
import { UI_STATE } from "operations/queries/uiState"
import { GET_BELL } from "operations/subscriptions/getBell"
import { useQuery, useSubscription } from "@apollo/client"
import { BellContext } from "./BellContext"
import { GoalList } from "./GoalList"
import { Bell as BellProps } from "operations/interface/Bell"
import { TaskList } from "./TaskList"
import { MainMenu } from "./MainMenu"
import { setUiState } from "operations/mutations/setUiState"
import { Loading, Error } from "components/Misc"
import runningIcon from "assets/img/running.png"
import styled from "styled-components"
import { dateFormat } from "utils/common"
import { usersToString } from "utils/user"
import { CircleImage } from "components/Circle"

const BellHeader: React.FC<{ bell: BellProps }> = ({ bell, ...props }) => {
  const bellhop =
    bell?.bellhop_participations.length > 0
      ? bell?.bellhop_participations[0].bellhop
      : { name: "Missing Bellhop info here" }

  return (
    <div className="mb-8 header">
      <div className="flex flex-row justify-between pb-1 border-b">
        <h4 className="">{bell?.name}</h4>
        <div className="py-2 italic align-baseline">{bellhop?.name}</div>
      </div>
      <div className="flex flex-row justify-between my-4">
        <div className="text-sm">
          <div>Started at {moment(bell?.updated_at).format(dateFormat)}</div>
          <div>Started by {usersToString(bell?.user_participations)}</div>
          <div className="my-4">{bell?.description}</div>
        </div>
        <CircleImage src={runningIcon} className="w-12 h-12 p-2 bg-green-400" />
      </div>
    </div>
  )
}

interface BellRawProps {}

const BellRaw: React.FC<BellRawProps> = (props) => {
  const {
    data: { uiState },
  } = useQuery(UI_STATE)

  const bellId = props?.computedMatch?.params.id
  setUiState({ runningBellId: bellId })

  const { data: bellData, loading, error } = useSubscription(GET_BELL, {
    variables: { id: bellId },
  })

  if (loading) return <Loading />
  if (error) return <Error message={error.message} />

  const bell = bellData.m2_bells_by_pk
  const tasks = bell.blocks.filter((block) => block.type === "Task")
  const goals = bell.blocks.filter(
    (block) => block.type === "Goal" || block.type === "Executor"
  )
  console.log(bell)

  return (
    <div>
      <MainMenu className="flex-none" />

      <div className="bell-context grid grid-cols-3">
        <div className="mx-4 mb-8 col-span-2">
          <BellHeader bell={bell} />
          <GoalList goals={goals} />
          <TaskList tasks={tasks} />
        </div>
        <div className="col-span-1">
          <BellContext bell={{ id: bellId }} {...props} />
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
