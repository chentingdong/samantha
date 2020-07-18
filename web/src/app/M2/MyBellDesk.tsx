// MyBellDesk.tsx
import React, { useState } from "react"
import { testingBellhopList } from "../../../data/initialBellhop"
import { BellhopThumbnailList } from "./BellhopThumbnailList"
import { BellsList } from "./BellsList"
import { BellhopContent } from "./BellhopContent"
import { useQuery, useSubscription } from "@apollo/client"
import { UI_STATE } from "../../operations/queries/uiState"
import { Error } from "../../components/Misc"
import { Loader } from "rsuite"

interface MyBellDeskProps {}

const MyBellDesk: React.FC<MyBellDeskProps> = (props) => {
  // TODO write up query for bellhop list, with fiters
  // const { loading, error, data } = useQuery(Bellhop)
  // const [bellhops, setBellhops] = useState(testingBellhopList)
  const bellhops = testingBellhopList
  const listTitle = "My Bellhops"
  const {
    data: { uiState },
    loading,
    error,
  } = useQuery(UI_STATE)

  if (loading) return <Loader speed="fast" content="Loading..." />
  if (error) return <Error message={error.message} />

  return (
    <div className="">
      {!uiState.currentBellhopId && (
        <BellhopThumbnailList bellhops={bellhops} listTitle={listTitle} />
      )}
      {uiState.currentBellhopId && <BellhopContent listTitle={listTitle} />}
      {uiState.currentBellhopId && <BellsList />}
    </div>
  )
}

export { MyBellDesk }
