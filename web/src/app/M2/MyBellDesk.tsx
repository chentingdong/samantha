// MyBellDesk.tsx
import React from "react"
import { BellhopThumbnailList } from "./BellhopList"
import { BellListCard } from "./BellList"
import { BellhopHeader } from "./BellhopHeader"
import { useSubscription } from "@apollo/client"
import { BELLHOP_LIST } from "operations/subscriptions/bellhopList"
import { BELL_LIST } from "operations/subscriptions/bellList"
import { Loading, Error } from "components/Misc"
import { BellCatalogList } from "./BellCatalogList"
import { MainMenu } from "./MainMenu"

interface MyBellDeskProps {}

const MyBellDesk: React.FC<MyBellDeskProps> = (props) => {
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
      {!props.computedMatch?.params?.bellhopId && (
        <BellhopThumbnailList
          bellhops={dataBellhopList?.m2_bellhops}
          listTitle="My Bellhops"
          backTo="/my-bell-desk"
        />
      )}
      {props.computedMatch?.params?.bellhopId && (
        <>
          <BellhopHeader listTitle="My Bellhops" backTo="/my-bell-desk" />
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
