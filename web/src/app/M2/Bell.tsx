import React, { useEffect } from "react"
import { Participants } from "./Participants"
import { useLocation, useHistory } from "react-router-dom"
import { UI_STATE } from "operations/queries/uiState"
import { useQuery } from "@apollo/client"
import { MainMenu } from "./MainMenu"
import { setUiState, resetUiState } from "operations/mutations/setUiState"

interface BellProps {}

export const Bell: React.FC<BellProps> = (props) => {
  const {
    data: { uiState },
  } = useQuery(UI_STATE)

  setUiState({ runningBellId: props?.computedMatch?.params.id })

  return (
    <div>
      <MainMenu className="md-8" />
      <div className="container mx-auto">
        <h4>
          [Facilities Purchase Request][Facilities] {uiState.runningBellId}
        </h4>
        <div className="grid grid-cols-3">
          <div className="col-span-3 md:col-span-2"></div>
          <div className="col-span-3 md:col-span-1">
            <Participants className="border-t" />
          </div>
        </div>
      </div>
    </div>
  )
}
