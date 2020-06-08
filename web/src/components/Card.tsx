import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"

const Card = styled.div`
  ${tw`rounded-md shadow border text-sm m-1`}
  .card-header {
    ${tw`rounded-t-md p-1`}
    color: var(--color-text-inverse);
    background: var(--color-bg-primary);
    display: block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .card-body {
    ${tw`rounded-b-md p-1 text-xs`}
    color: var(--color-text-default);
    background: var(--color-bg-default);
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
