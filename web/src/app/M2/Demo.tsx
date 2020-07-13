import React, { useState } from "react"
import MainMenu from "./MainMenu"
import "assets/tailwind/tailwind.generated.css"

export interface DemoProps {}

const Demo: React.SFC<DemoProps> = () => {
  const [active, setActive] = useState("lobby")

  return (
    <div className="theme-bell">
      <MainMenu
        active={active}
        onSelect={(activeKey) => setActive(activeKey)}
      />
    </div>
  )
}

export default Demo
