import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"
import { Icon } from "rsuite"
import { IconNames } from "rsuite/lib/Icon"

type ButtonType = {
  icon?: IconNames
  onClick?: (e) => void
  color?: string
  className?: string
  fill?: boolean
}

const ButtonRaw: React.FC<ButtonType> = ({
  icon,
  onClick,
  color = "primary",
  className = "",
  fill = true,
  ...props
}) => {
  if (fill) {
    className += " fill"
  }
  return (
    <button className={className} onClick={onClick}>
      {icon && <Icon className="pr-4" icon={icon} />}
      <span>{props.children}</span>
    </button>
  )
}

const Button = styled(ButtonRaw)`
  ${tw`rounded-full shadow py-2 px-4 items-baseline m-2`}
  border: 1px solid ${(props) => `var(--color-bg-${props.color})`};
  &:focus {
    outline: none;
  }
  &.fill,
  &:hover {
    color: ${(props) => `var(--color-text-${props.color})`};
    background: ${(props) => `var(--color-bg-${props.color})`};
  }
  &.fill:hover {
    color: ${(props) => `var(--color-bg-${props.color})`};
    background: ${(props) => `var(--color-text-${props.color})`};
  }
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  min-width: 5em;
  max-width: 20em;
  padding: 0.7em 1em;
  text-overflow: ellipsis;
  transition: background 0.2s;
`

export { Button }
