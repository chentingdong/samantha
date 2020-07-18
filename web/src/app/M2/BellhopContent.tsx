import * as React from "react"
import { setUiState } from "../../operations/mutations/setUiState"
import { UI_STATE } from "../../operations/queries/uiState"
import { useQuery, useSubscription } from "@apollo/client"
import { CircleImage } from "components/CircleImage"
import { BellList } from "./BellList"

interface BellhopContentProps {}

const BellhopContent: React.FC<BellhopContentProps> = (props) => {
  const {
    data: { uiState },
    loading,
  } = useQuery(UI_STATE)

  console.log(uiState)

  if (loading) return <>Loading</>
  return (
    <div>
      <div className="w-full p-8 bg-gray-300">
        <div className="container flex m-auto">
          <div className="flex-1 m-auto">
            <h5>Engineers</h5>
            <p className="p-4">
              Building cool product{" "}
              <span className="TODO">TODO: bellhop need description field</span>
            </p>
          </div>
          <div className="flex-none">
            <CircleImage className="border-2" alt="image" src="/dist/eng.png" />
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8">
        <div className="TODO">
          TODO: load bell is_definition=true on current bellhop id:{" "}
          <i>{uiState.currentBellhopId}</i>
        </div>
        <h5 className="py-2">Start a bell</h5>
        <BellList />
      </div>
    </div>
  )
}
export { BellhopContent }
