import React, { useState } from "react"
import { MainMenu } from "./MainMenu"
import { Lobby } from "./Lobby"
import { CompanyBellDesk } from "./CompanyBellDesk"
import { MyBellDesk } from "./MyBellDesk"
import { GoalNavigator } from "./GoalNavigator"
import { GoalNotification } from "./GoalNotification"
import { Bell } from "./Bell"
import { UI_STATE } from "operations/queries/uiState"
import { resetUiState } from "operations/mutations/setUiState"
import { useQuery } from "@apollo/client"

export interface DemoProps {}

export const Demo: React.FC<DemoProps> = () => {
  const {
    data: { uiState },
  } = useQuery(UI_STATE)
  const [active, setActive] = useState("lobby")
  const onSelect = (activeKey) => {
    resetUiState()
    setActive(activeKey)
  }

  return (
    <div className="p-0 m-0 theme-bell max-w-screen-2xl min-w-500">
      <MainMenu className="md-8" active={active} onSelect={onSelect} />
      <div className="relative">
        {active === "lobby" && <Lobby />}
        {active === "companyBellDesk" && <CompanyBellDesk />}
        {active === "myBellDesk" && <MyBellDesk />}
        {uiState?.currentBellId && (
          <GoalNavigator className="w-screen h-screen bg-default" />
        )}
        {uiState.showNotification && (
          <GoalNotification className="w-screen h-screen lef-0 bg-default" />
        )}
        {uiState?.runningBellId && (
          <Bell className="w-screen h-screen lef-0 bg-default" />
        )}
      </div>
    </div>
  )
}
