import React from "react"
import { setUiState } from "../../operations/mutations/setUiState"
import { CircleImage } from "components/CircleImage"
import { Button } from "components/Button"
import { Icon } from "rsuite"

interface BellhopHeaderProps {
  listTitle: string
}

const BellhopHeader: React.FC<BellhopHeaderProps> = ({
  listTitle = "",
  ...props
}) => {
  const unsetCurrentBellhop = () => {
    setUiState({
      currentBellhopId: null,
    })
  }

  return (
    <div {...props}>
      <div className="container mx-auto ">
        <Button
          color="primary"
          className="mb-4 ml-0 fill"
          onClick={unsetCurrentBellhop}
        >
          <Icon icon="left" />
          <span className="ml-2">{listTitle}</span>
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
              className="mr-4 border-2"
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
