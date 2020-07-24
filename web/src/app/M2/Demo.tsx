import React, { useState, useEffect } from "react"
import { MainMenu } from "./MainMenu"
import { Lobby } from "./Lobby"
import { CompanyBellDesk } from "./CompanyBellDesk"
import { MyBellDesk } from "./MyBellDesk"
import { GoalNavigator } from "./GoalNavigator"
import { GoalNotification } from "./GoalNotification"
import { Bell } from "./Bell"
import { useQuery } from "@apollo/client"
import { UI_STATE } from "operations/queries/uiState"
import { useLocation } from "react-router-dom"
import { setUiState, resetUiState } from "operations/mutations/setUiState"
import { mainMenuMapping } from "routes/routeUiMapping"

export interface DemoProps {}

export const Demo: React.FC<DemoProps> = () => {
  const {
    data: { uiState },
    loading,
  } = useQuery(UI_STATE)
  const location = useLocation()

  useEffect(() => {
    route2ui(location.pathname)
  }, [location.pathname])

  if (loading) return <>Loading...</>
  return (
    <div className="p-0 m-0 theme-bell max-w-screen-2xl min-w-500">
      <MainMenu className="md-8" />
      <pre>{JSON.stringify(uiState, null, 4)}</pre>
      <div className="relative">
        {uiState?.mainMenuActiveItem === "/lobby" && <Lobby />}
        {uiState?.mainMenuActiveItem === "/company-bell-desk" && (
          <CompanyBellDesk />
        )}
        {uiState?.mainMenuActiveItem === "/my-bell-desk" && <MyBellDesk />}
        {uiState?.currentBellId && (
          <GoalNavigator className="w-screen h-screen bg-default" />
        )}
        {!uiState?.mainMenuActiveItem && (
          <>
            <GoalNotification className="w-screen h-screen lef-0 bg-default" />
            <Bell className="w-screen h-screen lef-0 bg-default" type="Def" />
            <Bell className="w-screen h-screen lef-0 bg-default" type="Ins" />
          </>
        )}
      </div>
    </div>
  )
}
