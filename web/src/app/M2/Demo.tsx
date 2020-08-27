import { Bell } from "./Bell"
import { BellhopDesk } from "./BellhopDesk"
import { Lobby } from "./Lobby"
import { MainMenu } from "./MainMenu"
import React from "react"
import { getRouteParams } from "utils/router"
import { useLocation } from "react-router-dom"

interface DemoProps {}

const Demo: React.FC<DemoProps> = (props) => {
  const location = useLocation()
  const params = getRouteParams(location.pathname)
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <MainMenu className="flex-none w-full bg-white main-menu pb-4" />
      <div className="flex-grow">
        {params.menu === "lobby" && <Lobby />}
        {params.menu === "bellhops" && <BellhopDesk />}
        {params.menu === "bells" && <Bell />}
      </div>
    </div>
  )
}


export { Demo }
