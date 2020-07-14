import React, { CSSProperties } from "react"
import styled from "styled-components"
import tw from "tailwind.macro"

type CardType = {
  color?: string
  className?: string
  onClick?: () => void
}

const CardRaw: React.FC<CardType> = ({
  color = "bell",
  className,
  onClick,
  ...props
}) => {
  return (
    <div className={`${className} card`} onClick={onClick}>
      {props.children}
    </div>
  )
}

const Card = styled(CardRaw)`
  & {
    ${tw`rounded-lg shadow m-1 relative`}
    color: var(--color-text-default);
    background-color: var(--color-bg-default);
    .card-header,
    .card-body,
    .card-footer {
      ${tw`p-2 w-full`}
    }
    .card-header {
      ${tw`rounded-t-md p-2`};
      color: var(--color-text-secondary);
      background-color: ${(props) => `var(--color-${props.color})`};
      display: block;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .card-body {
      ${tw`rounded-b-md p-2 text-sm h-100`}
    }
    .card-footer {
      ${tw`absolute bottom-0`}
    }
    &.composite {
      display: block;
    }
    &.leaf {
      ${tw`m-1 `}
      display: inline-block;
    }
  }
`

export { Card }
