import React, { CSSProperties } from "react"
import styled from "styled-components"
import tw from "tailwind.macro"

type CardType = {
  color?: string
  className?: string
  onClick?: () => void
}

const CardRaw: React.FC<CardType> = ({
  color = "bg-secondary",
  className,
  onClick,
  ...props
}) => {
  return (
    <div className={`${className} card`} onClick={onClick} {...props}>
      {props.children}
    </div>
  )
}

const Card = styled(CardRaw)`
  & {
    ${tw`rounded-lg m-1 relative hover:shadow`}
    color: var(--color-text-default);
    background-color: var(--color-bg-default);
    .card-header,
    .card-body,
    .card-footer {
      ${tw`p-2 w-full`}
    }
    .card-header {
      ${tw`rounded-t-md p-2`};
      color: var(--color-text-default);
      background-color: ${(props) => `var(--color-${props.color})`};
      display: block;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .card-body {
      ${tw`rounded-b-md p-2`}
    }
    .card-footer {
    }
    &.composite {
      display: block;
    }
    &.leaf {
      ${tw`m-1`}
      display: inline-block;
    }
    h5,
    h6 {
      ${tw`font-sans my-2`}
    }
    h5 {
      font-size: 1.2em;
      font-weight: 600;
    }
    h6 {
      font-size: 1.1em;
      font-weight: 500;
    }
  }
`

export { Card }
