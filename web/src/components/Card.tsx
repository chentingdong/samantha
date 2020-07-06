import React, { CSSProperties } from "react"
import styled from "styled-components"
import tw from "tailwind.macro"

type CardType = {
  variant?: string
  className?: string
  onClick?: () => void
  style?: CSSProperties
}

const CardRaw: React.FC<CardType> = ({
  variant = "primary",
  className,
  style,
  onClick,
  ...props
}) => {
  return (
    <div className={className} onClick={onClick} style={style}>
      {props.children}
    </div>
  )
}

const Card = styled(CardRaw)`
  ${tw`rounded-md shadow text-sm m-1`}
  color: var(--color-text-default);
  background: var(--color-bg-default);
  .card-header {
    ${tw`rounded-t-md p-1`}
    color: var(--color-text-primary);
    background: var(--color-bg-primary);
    display: block;
    width: 100%;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .card-body {
    ${tw`rounded-b-md p-1 text-xs h-100`}
    max-height: 4.7em;
  }
  &.composite {
    display: block;
  }
  &.leaf {
    ${tw`m-1 `}
    display: inline-block;
  }
`

export { Card }
