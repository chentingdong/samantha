import React from "react"
import { useLocation } from "react-router-dom"
import { getRouteParams } from "utils/router"
import { CompanyBellDesk } from "./CompanyBellDesk"
import { MyBellDesk } from "./MyBellDesk"

interface BellhopDeskProps {}

export const BellhopDesk: React.FC<BellhopDeskProps> = (props) => {
  const location = useLocation()
  const params = getRouteParams(location)
  console.log(params)
  return (
    <div {...props}>
      {params.desk === "all" && <CompanyBellDesk />}
      {params.desk === "mine" && <MyBellDesk />}
    </div>
  )
}