import * as React from "react"
import { useLocation } from "react-router-dom"
import { getRouteParams } from "utils/router"
import { MainMenu } from "./MainMenu"
import { Bell } from "./Bell"
import { Lobby } from "./Lobby"
import { BellhopDesk } from "./BellhopDesk"
import styled from "styled-components"

interface DemoProps {}

export const DemoRaw: React.FC<DemoProps> = (props) => {
  const location = useLocation()
  const params = getRouteParams(location)
  return (
    <div {...props}>
      <MainMenu className="main-menu" />
      <div className="content">
        {params.menu === "lobby" && <Lobby />}
        {params.menu === "bellhops" && <BellhopDesk />}
        {params.menu === "bells" && <Bell />}
      </div>
    </div>
  )
}

const Demo = styled(DemoRaw)`
  .main-menu {
    height: 130px;
  }
  .content {
    height: calc(100vh - 130px);
    overflow: hidden;
  }
`
export { Demo }
