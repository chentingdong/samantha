import React, { useState } from "react"
import { testingBellhopList } from "../../../data/initialBellhop"
import { BellhopThumbnailList } from "./BellhopThumbnailList"
import { BellhopContent } from "./BellhopContent"
import { useQuery, useSubscription } from "@apollo/client"
import { UI_STATE } from "../../operations/queries/uiState"

interface CompanyBellDeskProps {}

const CompanyBellDesk: React.FC<CompanyBellDeskProps> = (props) => {
  // TODO write up query for bellhop list, with fiters
  // const { loading, error, data } = useQuery(Bellhop)
  // const [bellhops, setBellhops] = useState(testingBellhopList)
  const bellhops = testingBellhopList
  const listTitle = "All Bellhops"
  const {
    data: { uiState },
    loading,
  } = useQuery(UI_STATE)

  return (
    <div className="">
      {!uiState.currentBellhopId && (
        <BellhopThumbnailList bellhops={bellhops} listTitle={listTitle} />
      )}
      {uiState.currentBellhopId && <BellhopContent listTitle={listTitle} />}
    </div>
  )
}

export { CompanyBellDesk }
