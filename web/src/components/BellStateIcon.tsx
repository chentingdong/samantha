import React from "react"
import { Icon } from "rsuite"
import completedImage from "assets/img/completed.png"
import runningImage from "assets/img/running.png"
import todoImage from "assets/img/todo.png"

import { CircleImage } from "./Circle"

interface BellStateIconProps {
  state?: string
}
export const BellStateIcon: React.FC<BellStateIconProps> = ({
  state,
  ...props
}) => {
  switch (state) {
    case "Started":
    case "Completed":
      return <Icon icon="circle" {...props} />
    case "Running":
      return <Icon icon="adjust" rotate={180} {...props} />
    case "Created":
      return <Icon icon="circle-o" {...props} />
    default:
      return <Icon icon="circle" {...props} />
  }
}

export const BellStateImage: React.FC<BellStateIconProps> = ({
  state,
  ...props
}) => {
  switch (state) {
    case "Completed":
      return <CircleImage src={completedImage} alt="" {...props} />
    case "Running":
      return <CircleImage src={runningImage} alt="" {...props} />
    case "Started":
    case "Created":
    default:
      return <CircleImage src={todoImage} alt="" {...props} />
  }
}
