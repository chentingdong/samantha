import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"
import { Icon } from "rsuite"

const CircleStyle = styled.div`
  ${tw`m-0 p-0 w-24 h-24 bg-gray-200 flex content-center flex-wrap`}
  border-radius: 50%;
  min-width: 0;
  overflow: hidden;
  * {
    ${tw`mx-auto`}
  }
  img {
    ${tw`h-full w-auto mx-auto bg-transparent`}
    object-fit: cover;
  }
`

const CircleImage: React.FC<{
  src: string
  alt?: string
  className?: string
}> = ({ src, alt = "", className = "bg-blue-500", ...props }) => {
  return (
    <CircleStyle className={className} {...props}>
      <img src={src} alt="" />
    </CircleStyle>
  )
}

const CircleNumber: React.FC<{ number: string; className: string }> = ({
  number,
  ...props
}) => {
  return (
    <CircleStyle
      className="text-lg text-white bg-red-500 bg-red-700"
      {...props}
    >
      <div>{number}</div>
    </CircleStyle>
  )
}

const CircleIcon: React.FC<{ icon: any }> = ({ icon, ...props }) => {
  return (
    <CircleStyle className="bg-orange-500" {...props}>
      <Icon icon={icon} />
    </CircleStyle>
  )
}
export { CircleImage, CircleNumber, CircleIcon }
