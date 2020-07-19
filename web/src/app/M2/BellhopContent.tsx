import * as React from "react"
import { setUiState } from "../../operations/mutations/setUiState"
import { UI_STATE } from "../../operations/queries/uiState"
import { useQuery, useSubscription } from "@apollo/client"
import { CircleImage } from "components/CircleImage"
import { Button } from "components/Button"
import { Error } from "../../components/Misc"
import { Loader } from "rsuite"
import { BellCatalogList } from "./BellCatalogList"
import { TODO } from "components/TODO"

interface BellhopContentProps {
  listTitle: string
}

const BellhopContent: React.FC<BellhopContentProps> = ({
  listTitle = "",
  ...props
}) => {
  const {
    data: { uiState },
    loading,
    error,
  } = useQuery(UI_STATE)

  const unsetCurrentBellhop = () => {
    setUiState({
      currentBellhopId: null,
    })
  }

  if (loading) return <Loader speed="fast" content="Loading..." />
  if (error) return <Error message={error.message} />
  return (
    <div {...props}>
      <div className="container m-auto">
        <Button color="primary" className="fill" onClick={unsetCurrentBellhop}>
          {listTitle}
        </Button>
      </div>
      <div className="w-full p-8 bg-gray-300">
        <div className="container flex m-auto">
          <div className="flex-1 m-auto">
            <h5>Engineers</h5>
            <p className="p-4">
              Building cool product <TODO>bellhop need description field</TODO>
            </p>
          </div>
          <div className="flex-none">
            <CircleImage className="border-2" alt="image" src="/dist/eng.png" />
          </div>
        </div>
      </div>
    </div>
  )
}
export { BellhopContent }
