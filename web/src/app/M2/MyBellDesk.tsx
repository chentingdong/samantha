// MyBellDesk.tsx
import React from "react"
import { BellhopThumbnailList } from "./BellhopList"
import { BellListCard } from "./BellList"
import { BellhopHeader } from "./BellhopHeader"
import { useQuery, useSubscription } from "@apollo/client"
import { UI_STATE } from "../../operations/queries/uiState"
import { BELLHOP_LIST } from "operations/subscriptions/bellhopList"
import { BELL_LIST } from "operations/subscriptions/bellList"
import { Loading, Error } from "components/Misc"
import { BellCatalogList } from "./BellCatalogList"
import { MainMenu } from "./MainMenu"

interface MyBellDeskProps {}

const MyBellDesk: React.FC<MyBellDeskProps> = (props) => {
  const {
    data: { uiState },
  } = useQuery(UI_STATE)

  const {
    data: dataBellhopList,
    loading: loadingBellhopList,
    error: errorBellhopList,
  } = useSubscription(BELLHOP_LIST)

  const {
    data: dataBellList,
    loading: loadingBellList,
    error: errorBellList,
  } = useSubscription(BELL_LIST, {})

  return (
    <div className="">
      <MainMenu className="md-8" />
      {loadingBellhopList && <Loading />}
      {errorBellhopList && <Error message={errorBellhopList.message} />}
      {!uiState?.currentBellhopId && (
        <BellhopThumbnailList
          bellhops={dataBellhopList?.m2_bellhops}
          listTitle="My Bellhops"
        />
      )}
      {uiState?.currentBellhopId && (
        <>
          <BellhopHeader listTitle="My Bellhops" />
          <BellCatalogList className="container mx-auto" />
          {loadingBellList && <Loading />}
          {errorBellList && <Error message={errorBellList.message} />}
          <BellListCard
            className="container mx-auto"
            listTitle="Running Bells"
            bells={dataBellList?.m2_bells}
          />
        </>
      )}
    </div>
  )
}

export { MyBellDesk }
