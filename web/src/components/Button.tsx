import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"

const Button = styled.div`
  ${tw`rounded-md shadow p-2 text-center`}
  cursor: pointer;
  background: var(--color-bg-secondary);
  &:hover {
    background: var(--color-bg-default);
  }
  transition: background 0.3s;
`
export { Button }
