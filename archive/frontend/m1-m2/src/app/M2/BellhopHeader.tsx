import React from "react"
import { CircleImage } from "components/Circle"
import { Button } from "components/Button"
import { Icon } from "rsuite"
import { Link } from "react-router-dom"
import { Bellhop } from "models/interface"

interface BellhopHeaderProps {
  listTitle: string
  bellhop: Bellhop
  backTo: string
}

const BellhopHeader: React.FC<BellhopHeaderProps> = ({
  listTitle = "",
  backTo,
  bellhop,
  ...props
}) => {
  return (
    <div {...props}>
      <div className="container mx-auto ">
        <Button color="primary" className="mb-4 ml-0 fill">
          <Link to={backTo} className="no-underline">
            <Icon icon="left" />
            <span className="ml-2">{listTitle}</span>
          </Link>
        </Button>
      </div>
      <div className="w-full p-4 bg-gray-200">
        <div className="container flex m-auto">
          <div className="flex-1 m-auto">
            <h4>{bellhop?.name}</h4>
            <div className="p-4">{bellhop?.description}</div>
          </div>
          <div className="flex-none mr-4">
            <CircleImage
              className="w-24 h-24 mr-4 bg-white"
              alt="image"
              src={bellhop?.profile_image_url}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export { BellhopHeader }
