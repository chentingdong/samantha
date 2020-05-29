import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"

const Card = styled.div`
  .card {
    ${tw`rounded-md shadow`}
    border: 1px solid;
    border-color: var(--color-text-secondary);
    .card-header {
      ${tw`rounded-t-md p-1`}
      display: block;
      white-space: nowrap;
      width: 100%;
      background: var(--color-bg-primary);
      overflow: Hidden;
    }
    .card-body {
      ${tw`rounded-md p-1`}
      background: var(--color-bg-default);
      height: 5em;
      overflow: hidden;
    }
  }
`
export { Card }
