import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"

interface CircleImageProps {
  src?: string
}

const CircleImageRaw: React.FC<CircleImageProps> = ({
  src = null,
  ...props
}) => {
  return (
    <div {...props}>
      <img src={src} alt="" />
    </div>
  )
}

const CircleImage = styled(CircleImageRaw)`
  ${tw`m-0 p-0 w-24 h-24 bg-blue-500`}
  border-radius: 50%;
  min-width: 0;
  overflow: hidden;
  img {
    ${tw`h-full w-auto bg-transparent`}
    object-fit: cover;
  }
`

export { CircleImage }
