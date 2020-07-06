import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"
import { Icon } from "rsuite"
import { IconNames } from "rsuite/lib/Icon"

type ButtonType = {
  icon?: IconNames
  onClick?: (e) => void
  variant?: string
  className?: string
  filled?: boolean
}

const ButtonRaw: React.FC<ButtonType> = ({
  icon,
  onClick,
  variant = "primary",
  className = "",
  filled = true,
  ...props
}) => {
  if (filled) {
    className += " filled"
  }
  return (
    <button className={className} onClick={onClick}>
      {icon && <Icon className="pr-4" icon={icon} />}
      <span className="flex-auto"> {props.children}</span>
    </button>
  )
}

const Button = styled(ButtonRaw)`
  ${tw`rounded-full shadow py-2 px-4 items-baseline m-2 flex`}
  border: 1px solid ${(props) => `var(--color-bg-${props.variant})`};
  &.filled {
    color: ${(props) => `var(--color-text-${props.variant})`};
    background: ${(props) => `var(--color-bg-${props.variant})`};
  }
  cursor: pointer;
  transition: background 0.3s;
`

export { Button }
