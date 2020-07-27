// MyBellDesk.tsx
import React, { useState } from "react"
import { testingBellhopList } from "../../../data/bellhop"
import { BellhopThumbnailList } from "./BellhopList"
import { BellListCard } from "./BellList"
import { BellhopHeader } from "./BellhopHeader"
import { useQuery, useSubscription } from "@apollo/client"
import { UI_STATE } from "../../operations/queries/uiState"
import { BELLS_LIST } from "operations/subscriptions/bellsList"
import { Loading, Error } from "components/Misc"
import { BellCatalogList } from "./BellCatalogList"
import { MainMenu } from "./MainMenu"

interface MyBellDeskProps {}

const MyBellDesk: React.FC<MyBellDeskProps> = (props) => {
  // const { loading, error, data } = useQuery(Bellhop)
  // const [bellhops, setBellhops] = useState(testingBellhopList)
  const bellhops = testingBellhopList.slice(1, 3)
  const listTitle = "Running Bells"
  const {
    data: { uiState },
  } = useQuery(UI_STATE)

  const { loading, error, data } = useSubscription(BELLS_LIST, {})

  const bells = data?.bells
  if (loading) return <Loading />
  if (error) return <Error message={error.message} />
  if (!bells) return <></>

  return (
    <div className="">
      <MainMenu className="md-8" />
      {loading && <Loading />}
      {error && <Error message={error.message} />}
      {!uiState?.currentBellhopId && (
        <BellhopThumbnailList bellhops={bellhops} listTitle={listTitle} />
      )}
      {uiState?.currentBellhopId && (
        <>
          <BellhopHeader listTitle={listTitle} />
          <BellCatalogList className="m-4" />
          <BellListCard className="m-4" listTitle={listTitle} bells={bells} />
        </>
      )}
    </div>
  )
}

export { MyBellDesk }
