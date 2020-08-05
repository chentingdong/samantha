import React from "react"
import { Icon } from "rsuite"
import completedImage from "assets/img/completed.png"
import runningImage from "assets/img/running.png"
import todoImage from "assets/img/todo.png"
import styled from "styled-components"
import tw from "tailwind.macro"
import { CircleImage } from "./Circle"

interface StateIconProps {
  className?: string
  state?: string
}
export const ActivityStateIcon: React.FC<StateIconProps> = ({
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

const BellStateIconRaw: React.FC<StateIconProps> = ({
  state,
  className,
  ...props
}) => {
  console.log(state)
  switch (state) {
    case "Success":
      return <Icon icon="check" alt="" className={`${className} bg-blue-500`} />
    case "Failure":
      return <Icon icon="close" alt="" className={`${className} bg-red-500`} />
    case "Running":
      return (
        <Icon
          icon="fighter-jet"
          alt=""
          className={`${className} bg-green-500`}
        />
      )
    case "Started":
    case "Created":
    default:
      return <></>
  }
}

const BellStateIcon = styled(BellStateIconRaw)`
  &.rs-icon {
    ${tw`text-2xl flex content-center flex-wrap rounded-full`}
    &::before {
      ${tw`mx-auto mb-1 ml-1`}
    }
  }
`

export { BellStateIcon }
