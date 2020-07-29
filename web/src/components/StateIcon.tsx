import React from "react"
import { Icon } from "rsuite"

interface StateIconProps {
  state?: string
}
export const StateIcon: React.FC<StateIconProps> = (state) => {
  switch (state?.state) {
    case "Started":
    case "Completed":
      return <Icon icon="circle" />
    case "Running":
      return <Icon icon="play-circle-o" />
    case "Created":
      return <Icon icon="circle-o" />
    default:
      return <Icon icon="circle" />
  }
}
