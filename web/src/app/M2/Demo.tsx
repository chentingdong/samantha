import React, { useState, useEffect } from "react"
import { MainMenu } from "./MainMenu"
import { Lobby } from "./Lobby"
import { CompanyBellDesk } from "./CompanyBellDesk"
import { MyBellDesk } from "./MyBellDesk"
import { GoalNavigator } from "./GoalNavigator"
import "../../../dist/tailwind/tailwind.generated.css"
import { GoalNotification } from "./GoalNotification"
import { resetUiState } from "operations/mutations/setUiState"
import { injectRsuiteStyle } from "../../utils/styles"

export interface DemoProps {}

export const Demo: React.FC<DemoProps> = () => {
  const [active, setActive] = useState("lobby")
  const onSelect = (activeKey) => {
    resetUiState()
    setActive(activeKey)
  }
  injectRsuiteStyle("bell")

  return (
    <div className="p-0 m-0 theme-bell max-w-screen-2xl min-w-500">
      <MainMenu active={active} onSelect={onSelect} />
      <div className="relative">
        {active === "lobby" && <Lobby />}
        {active === "companyBellDesk" && <CompanyBellDesk />}
        {active === "myBellDesk" && <MyBellDesk />}
        <GoalNavigator className="" />
        <GoalNotification className="absolute top-0 z-20 w-screen h-screen lef-0 bg-default" />
      </div>
    </div>
  )
}
