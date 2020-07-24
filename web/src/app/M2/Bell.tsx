import React, { useEffect } from "react"
import { Participants } from "./Participants"
import { useLocation, useHistory } from "react-router-dom"
import { UI_STATE } from "operations/queries/uiState"
import { useQuery } from "@apollo/client"
import { MainMenu } from "./MainMenu"
import { setUiState, resetUiState } from "operations/mutations/setUiState"
import { matchPath } from "react-router"

interface BellProps {
  className: string
  type: "Ins" | "Def"
}

export const Bell: React.FC<BellProps> = ({
  className,
  type = "Ins",
  ...props
}) => {
  const location = useLocation()
  const history = useHistory()

  const {
    data: { uiState },
  } = useQuery(UI_STATE)

  const route2ui = (pathname: string, type: string): void => {
    console.log(pathname)
    const match = matchPath(pathname, {
      path: "/bells/:runningBellId",
      exact: true,
      strict: false,
    })
    if (match && type === "Ins")
      setUiState({ runningBellId: match.params["runningBellId"] })
    else if (match && type === "Def")
      setUiState({ currentBellDefId: match.params["currentBellDefId"] })
  }

  useEffect(() => {
    route2ui(location.pathname, "Ins")
  }, [location.pathname])

  const ui2route = () => {
    // TODO use same path for now.
    if (uiState.runningBellId) history.push("/bells/" + uiState.runningBellId)
    else if (uiState.currentBellDefId)
      history.push("/bells/" + uiState.currentBellDefId)
  }

  // useEffect(() => {
  //   ui2route()
  // }, [uiState])

  return (
    <div className={className} {...props}>
      <MainMenu />
      <h3>[Facilities Purchase Request][Facilities] {uiState.runningBellId}</h3>
      <div className={`${className} grid grid-cols-3 lg:grid-cols-3`}>
        <div className="col-span-3 lg:col-span-2"></div>
        <div className="col-span-3 lg:col-span-1">
          <Participants />
        </div>
      </div>
    </div>
  )
}
