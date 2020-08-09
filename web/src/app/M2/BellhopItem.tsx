import React, { useEffect } from "react"
import { Bellhop } from "models/interface"
import { Button } from "components/Button"
import { Link } from "react-router-dom"
import styled from "styled-components"
import tw from "tailwind.macro"

interface BellhopProps {
  bellhop: Bellhop
  backTo: string
}

const BellhopThumbnailRaw: React.FC<BellhopProps> = ({
  bellhop,
  backTo,
  ...props
}) => {
  return (
    <div {...props}>
      <img src={bellhop.profile_image_url} alt="" />
      <Link className="" to={`${backTo}/${bellhop.id}`}>
        <Button className="fill" color="primary">
          {bellhop.name}
        </Button>
      </Link>
    </div>
  )
}

const BellhopThumbnail = styled(BellhopThumbnailRaw)`
  ${tw`relative h-32 overflow-hidden border lg:h-48 xl:h-64`}
  img {
    ${tw`absolute z-0 object-cover w-full h-full opacity-25`}
  }
  a {
    ${tw`absolute top-0 z-10 flex content-center w-full h-full no-underline`}
  }
  button {
    ${tw`w-4/5 m-auto`}
  }
`

export { BellhopThumbnail }
