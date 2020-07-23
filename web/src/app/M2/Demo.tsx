import React, { useState } from "react"
import { MainMenu } from "./MainMenu"
import { Lobby } from "./Lobby"
import { CompanyBellDesk } from "./CompanyBellDesk"
import { MyBellDesk } from "./MyBellDesk"
import { GoalNavigator } from "./GoalNavigator"
import { GoalNotification } from "./GoalNotification"
import { Bell } from "./Bell"
import { UI_STATE } from "operations/queries/uiState"
import { useQuery } from "@apollo/client"

export interface DemoProps {}

export const Demo: React.FC<DemoProps> = () => {
  const { data, loading } = useQuery(UI_STATE)
  if (loading) return <>Loading...</>
  return (
    <div className="p-0 m-0 theme-bell max-w-screen-2xl min-w-500">
      <MainMenu className="md-8" />
      <div className="relative">
        {data?.uiState?.mainMenuActiveItem === "/lobby" && <Lobby />}
        {data?.uiState?.mainMenuActiveItem === "/company-bell-desk" && (
          <CompanyBellDesk />
        )}
        {data?.uiState?.mainMenuActiveItem === "/my-bell-desk" && (
          <MyBellDesk />
        )}
        {data?.uiState?.currentBellId && (
          <GoalNavigator className="w-screen h-screen bg-default" />
        )}
        {data?.uiState.showNotification && (
          <GoalNotification className="w-screen h-screen lef-0 bg-default" />
        )}
        {data?.uiState?.runningBellId && (
          <Bell className="w-screen h-screen lef-0 bg-default" />
        )}
      </div>
    </div>
  )
}
