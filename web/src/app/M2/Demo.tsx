import { Bell } from "./Bell"
import { BellhopDesk } from "./BellhopDesk"
import { Lobby } from "./Lobby"
import { MainMenu } from "./MainMenu"
import React from "react"
import { getRouteParams } from "utils/router"
import { useLocation } from "react-router-dom"

interface DemoProps {}

export const Demo: React.FC<DemoProps> = (props) => {
  const location = useLocation()
  const params = getRouteParams(location.pathname)
  return (
    <div className="flex flex-col justify-between w-full h-screen gap-8">
      <MainMenu className="flex-none main-menu" />
      <div className="flex-grow overflow-y-auto content">
        {params.menu === "lobby" && <Lobby />}
        {params.menu === "bellhops" && <BellhopDesk />}
        {params.menu === "bells" && <Bell />}
      </div>
    </div>
  )
}
