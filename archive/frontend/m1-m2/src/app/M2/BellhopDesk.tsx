import { CompanyBellDesk } from "./CompanyBellDesk"
import { MyBellDesk } from "./MyBellDesk"
import React from "react"
import { getRouteParams } from "utils/router"
import { useLocation } from "react-router-dom"

interface BellhopDeskProps {
  className?: string
}

export const BellhopDesk: React.FC<BellhopDeskProps> = (props) => {
  const location = useLocation()
  const params = getRouteParams(location.pathname)
  return (
    <div {...props}>
      {params.desk === "all" && <CompanyBellDesk />}
      {params.desk === "mine" && <MyBellDesk />}
    </div>
  )
}
