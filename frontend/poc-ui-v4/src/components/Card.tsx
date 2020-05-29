import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"

const Card = styled.div`
  ${tw`rounded-md shadow border`}
  color: var(--color-text-primary);
  border-color: var(--color-text-secondary);
  background: var(--color-bg-primary);
  .card-header {
    ${tw`rounded-t-md p-1`}
    background: var(--color-bg-default);
    display: block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .card-body {
    ${tw`rounded-b-md p-1 text-xs`}
    max-height: 4.7em;
  }
`

export { Card }
