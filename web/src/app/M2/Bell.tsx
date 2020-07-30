import React from "react"
import { UI_STATE } from "operations/queries/uiState"
import { GET_BELL } from "operations/subscriptions/getBell"
import { useQuery, useSubscription } from "@apollo/client"
import { BellContext } from "./BellContext"
import { GoalList } from "./GoalList"
import { TaskList } from "./TaskList"
import { MainMenu } from "./MainMenu"
import { setUiState } from "operations/mutations/setUiState"
import { Loading, Error } from "components/Misc"
import styled from "styled-components"

interface BellProps {}

const BellRaw: React.FC<BellProps> = (props) => {
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

  return (
    <div>
      <MainMenu className="flex-none" />
      <h6 className="m-4">
        {bell.name}[Facilities] {bell.id}
      </h6>
      <div className="bell-context grid grid-cols-3">
        <div className="mx-4 col-span-2">
          <GoalList />
          <TaskList />
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
