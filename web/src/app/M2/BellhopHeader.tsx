import * as React from "react"
import { setUiState } from "../../operations/mutations/setUiState"
import { CircleImage } from "components/CircleImage"
import { Button } from "components/Button"
import { Error } from "../../components/Misc"
import { Loader, Icon } from "rsuite"
import { TODO } from "components/TODO"

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
      <div className="container m-auto">
        <Button color="primary" className="fill" onClick={unsetCurrentBellhop}>
          <Icon icon="left" />
          <span className="ml-2">{listTitle}</span>
        </Button>
      </div>
      <div className="w-full p-8 bg-gray-300">
        <div className="container flex m-auto">
          <div className="flex-1 m-auto">
            <h3>Engineers</h3>
            <TODO>bellhop need description field</TODO>
            <div className="p-4">Building cool product</div>
          </div>
          <div className="flex-none">
            <CircleImage
              className="mr-64 border-2"
              alt="image"
              src="/dist/eng.png"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export { BellhopHeader }
