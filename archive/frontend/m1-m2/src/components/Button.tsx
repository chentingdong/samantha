import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"
import { Icon } from "rsuite"
import { IconNames } from "rsuite/lib/Icon"

type ButtonType = {
  icon?: IconNames
  color?: string
  className?: string
  onClick?: (e) => void
}

const ButtonRaw: React.FC<ButtonType> = ({
  icon,
  color = "primary",
  className = "",
  onClick,
  ...props
}) => {
  return (
    <button className={className} {...props} onClick={onClick}>
      {icon && <Icon className="pr-4" icon={icon} />}
      <span>{props.children}</span>
    </button>
  )
}

const Button = styled(ButtonRaw)`
  ${tw`rounded-full items-baseline m-2 shadow overflow-hidden cursor-pointer`}
  padding: 0.5em 1em;
  white-space: nowrap;
  min-width: 5em;
  max-width: 20em;
  text-overflow: ellipsis;
  transition: background 0.2s linear;
  transition: color 0.2s linear;
  border: 1px solid ${(props) => `var(--color-bg-${props.color})`};
  background: ${(props) => `var(--color-text-${props.color})`};
  &:focus {
    outline: none;
  }
  &.circle,
  &.circle:hover {
    ${tw`m-0 p-0`}
    border-color: ${(props) => `var(--color-bg-${props.color})`};
    border-radius: 50%;
    height: 2.3rem;
    width: 2.3rem;
    min-width: 0;
    overflow: hidden;
    img {
      ${tw`h-full w-auto`}
      object-fit: cover;
    }
  }
  &.fill,
  &:hover {
    color: ${(props) => `var(--color-text-${props.color})`};
    background: ${(props) => `var(--color-bg-${props.color})`};
  }
  &.fill:hover{
    color: ${(props) => `var(--color-bg-${props.color})`};
    background: ${(props) => `var(--color-text-${props.color})`};
    border-color: ${(props) => `var(--color-bg-${props.color})`};
  }
`

export { Button }
