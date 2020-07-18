import * as React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"

interface CircleImageProps {
  src: string
}

const CircleImageRaw: React.FC<CircleImageProps> = ({
  src = null,
  ...props
}) => {
  return (
    <figure {...props}>
      <img src={src} alt="" />
    </figure>
  )
}

const CircleImage = styled(CircleImageRaw)`
  ${tw`m-0 p-0 w-32 h-32 bg-blue-500 border-2 mr-64`}
  border-radius: 50%;
  min-width: 0;
  overflow: hidden;
  img {
    ${tw`h-full w-auto`}
    object-fit: cover;
  }
`

export { CircleImage }
