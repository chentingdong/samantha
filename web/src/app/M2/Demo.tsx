import * as React from "react"
import { useLocation } from "react-router-dom"
import { getRouteParams } from "utils/router"
import { MainMenu } from "./MainMenu"
import { Bell } from "./Bell"
import { Lobby } from "./Lobby"
import { BellhopDesk } from "./BellhopDesk"

interface DemoProps {}

export const Demo: React.FC<DemoProps> = (props) => {
  const location = useLocation()
  const params = getRouteParams(location)
  return (
    <div>
      <MainMenu className="flex-none" />
      {params.menu === "lobby" && <Lobby />}
      {params.menu === "bellhops" && <BellhopDesk />}
      {params.menu === "bells" && <Bell />}
    </div>
  )
}
