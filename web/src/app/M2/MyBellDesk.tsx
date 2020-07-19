// MyBellDesk.tsx
import React, { useState } from "react"
import { testingBellhopList } from "../../../data/initialBellhop"
import { BellhopThumbnailList } from "./BellhopList"
import { BellListCard } from "./BellList"
import { BellhopHeader } from "./BellhopHeader"
import { useQuery, useSubscription } from "@apollo/client"
import { UI_STATE } from "../../operations/queries/uiState"
import { BELLS_LIST } from "operations/subscriptions/bellsList"
import { Error } from "../../components/Misc"
import { Loader } from "rsuite"
import { BellCatalogList } from "./BellCatalogList"
import { TODO } from "components/TODO"
interface MyBellDeskProps {}

const MyBellDesk: React.FC<MyBellDeskProps> = (props) => {
  // const { loading, error, data } = useQuery(Bellhop)
  // const [bellhops, setBellhops] = useState(testingBellhopList)
  const bellhops = testingBellhopList.slice(1, 3)
  const listTitle = "My Bellhops"
  const {
    data: { uiState },
  } = useQuery(UI_STATE)

  const { loading, error, data } = useSubscription(BELLS_LIST, {})

  const bells = data?.bells
  if (loading) return <Loader speed="fast" content="Loading..." />
  if (error) return <Error message={error.message} />
  if (!bells) return <></>

  return (
    <div className="">
      {!uiState.currentBellhopId && (
        <BellhopThumbnailList bellhops={bellhops} listTitle={listTitle} />
      )}
      {uiState.currentBellhopId && (
        <>
          <BellhopHeader listTitle={listTitle} />
          <BellCatalogList className="container m-auto" />
          <BellListCard className="container m-auto" bells={bells} />
        </>
      )}
    </div>
  )
}

export { MyBellDesk }
