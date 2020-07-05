import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"

const ButtonRaw = (props) => {
  return <button {...props} />
}

const Button = styled(ButtonRaw)`
  ${tw`rounded-md shadow p-2 text-center m-2`}
  cursor: pointer;
  color: var(--color-text-secondary);
  background: var(--color-bg-secondary);
  &:hover {
    color: var(--color-text-primary);
    background: var(--color-bg-primary);
  }
  transition: background 0.3s;
`

export { Button }
