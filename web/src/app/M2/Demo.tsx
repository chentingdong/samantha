import React, { useState } from "react"
import { MainMenu } from "./MainMenu"
import { Lobby } from "./Lobby"
import { BellDesk } from "./BellDesk"
import { MyBellhops } from "./MyBellhops"
import "../../../dist/tailwind/tailwind.generated.css"

export interface DemoProps {}

export const Demo: React.FC<DemoProps> = () => {
  const [active, setActive] = useState("lobby")

  return (
    <div className="theme-bell max-w-screen-2xl mx-auto">
      <MainMenu
        active={active}
        onSelect={(activeKey) => setActive(activeKey)}
      />
      <div className="p-4">
        {active === "lobby" && <Lobby />}
        {active === "bellDesk" && <BellDesk />}
        {active === "myBellhops" && <MyBellhops />}
      </div>
    </div>
  )
}
