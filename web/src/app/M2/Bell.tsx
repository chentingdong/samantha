import React from "react"
import { UI_STATE } from "operations/queries/uiState"
import { useQuery } from "@apollo/client"
import { Goals } from "./Goals"
import { MyStatus } from "./MyStatus"
import { MainMenu } from "./MainMenu"
import { setUiState, resetUiState } from "operations/mutations/setUiState"
import { Link, useLocation } from "react-router-dom"

interface BellProps {}

export const Bell: React.FC<BellProps> = (props) => {
  const {
    data: { uiState },
  } = useQuery(UI_STATE)

  setUiState({ runningBellId: props?.computedMatch?.params.id })

  return (
    <div className="flex flex-col min-h-screen md:h-auto">
      <MainMenu className="flex-none" />
      <div className="container flex-grow mx-auto">
        <div className="flex flex-col ">
          <h6 className="flex-none m-4">
            [Facilities Purchase Request][Facilities] {uiState.runningBellId}
          </h6>
          <div className="flex-none p-4">
            <Link to={`/bells/${props?.computedMatch?.params.id}/my-status`}>
              My Status
            </Link>
            <Link to={`/bells/${props?.computedMatch?.params.id}/goals`}>
              Goals
            </Link>
            <Goals />
            <MyStatus />
          </div>
        </div>
      </div>
    </div>
  )
}
