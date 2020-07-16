import React, { useState } from "react"
import { MainMenu } from "./MainMenu"
import { Lobby } from "./Lobby"
import { CompanyBellDesk } from "./CompanyBellDesk"
import { MyBellDesk } from "./MyBellDesk"
import "../../../dist/tailwind/tailwind.generated.css"

export interface DemoProps {}

export const Demo: React.FC<DemoProps> = () => {
  const [active, setActive] = useState("lobby")

  return (
    <div className="theme-bell max-w-screen-2xl mx-auto px-8">
      <MainMenu
        active={active}
        onSelect={(activeKey) => setActive(activeKey)}
      />
      <div className="p-4">
        {active === "lobby" && <Lobby />}
        {active === "companyBellDesk" && <CompanyBellDesk />}
        {active === "myBellDesk" && <MyBellDesk />}
      </div>
    </div>
  )
}
