import React, { useState } from "react"
import { MainMenu } from "./MainMenu"
import { Lobby } from "./Lobby"
import { CompanyBellDesk } from "./CompanyBellDesk"
import { MyBellDesk } from "./MyBellDesk"
import "../../../dist/tailwind/tailwind.generated.css"

export interface DemoProps {}

export const Demo: React.FC<DemoProps> = () => {
  const [active, setActive] = useState("companyBellDesk")

  return (
    <div className="p-0 m-0 theme-bell max-w-screen-2xl min-w-500">
      <MainMenu
        active={active}
        onSelect={(activeKey) => setActive(activeKey)}
      />
      <div>
        {active === "lobby" && <Lobby />}
        {active === "companyBellDesk" && <CompanyBellDesk />}
        {active === "myBellDesk" && <MyBellDesk />}
      </div>
    </div>
  )
}
