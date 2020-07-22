import React from "react"
import { Participants } from "./Participants"

interface BellProps {
  className: string
}

export const Bell: React.FC<BellProps> = ({ className, ...props }) => {
  return (
    <div>
      <h3>[Facilities Purchase Request][Facilities]</h3>
      <div className={`${className} grid grid-cols-3 lg:grid-cols-3`}>
        <div className="col-span-3 lg:col-span-2"></div>
        <div className="col-span-3 lg:col-span-1">
          <Participants />
        </div>
      </div>
    </div>
  )
}
