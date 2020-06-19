import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"

const Button = styled.button`
  ${tw`rounded-md shadow p-2 text-center m-2`}
  cursor: pointer;
  background: var(--color-bg-secondary);
  &:hover {
    background: var(--color-bg-primary);
  }
  transition: background 0.3s;
`
export { Button }
