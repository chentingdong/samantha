import React from "react"
import { CircleImage } from "components/Circle"
import { Button } from "components/Button"
import { Icon } from "rsuite"
import { Link } from "react-router-dom"

interface BellhopHeaderProps {
  listTitle: string
  backTo: string
}

const BellhopHeader: React.FC<BellhopHeaderProps> = ({
  listTitle = "",
  backTo,
  ...props
}) => {
  return (
    <div {...props}>
      <div className="container mx-auto ">
        <Button color="primary" className="mb-4 ml-0 fill">
          <Link to={backTo}>
            <Icon icon="left" />
            <span className="ml-2">{listTitle}</span>
          </Link>
        </Button>
      </div>
      <div className="w-full p-4 bg-gray-300">
        <div className="container flex m-auto">
          <div className="flex-1 m-auto">
            <h4>Engineers</h4>
            <div className="p-4">Building cool product!</div>
          </div>
          <div className="flex-none mr-4">
            <CircleImage
              className="mr-4 bg-white"
              alt="image"
              src="https://samantha-assets.s3.amazonaws.com/images/eng.png"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export { BellhopHeader }
