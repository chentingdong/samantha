import React from "react"
import { UI_STATE } from "operations/queries/uiState"
import { useQuery } from "@apollo/client"
import { BellContext } from "./BellContext"
import { GoalList } from "./GoalList"
import { Tasks } from "./Tasks"
import { MainMenu } from "./MainMenu"
import { setUiState } from "operations/mutations/setUiState"
import styled from "styled-components"

interface BellProps {}

const BellRaw: React.FC<BellProps> = (props) => {
  const {
    data: { uiState },
  } = useQuery(UI_STATE)

  const bellId = props?.computedMatch?.params.id
  setUiState({ runningBellId: bellId })

  return (
    <div>
      <MainMenu className="flex-none" />
      <h6 className="m-4">
        [Facilities Purchase Request][Facilities] {uiState.runningBellId}
      </h6>
      <div className="bell-context grid grid-cols-3">
        <div className="mx-4 col-span-2">
          <GoalList />
          <Tasks />
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
