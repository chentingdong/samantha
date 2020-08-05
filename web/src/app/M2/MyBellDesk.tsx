// MyBellDesk.tsx
import React from "react"
import { BellhopThumbnailList } from "./BellhopList"
import { BellListCard } from "./BellList"
import { BellhopHeader } from "./BellhopHeader"
import { useSubscription, useQuery } from "@apollo/client"
import { BELLHOP_LIST } from "operations/subscriptions/bellhopList"
import { BELL_LIST } from "operations/subscriptions/bellList"
import { Loading, Error } from "components/Misc"
import { BellCatalogList } from "./BellCatalogList"
import { MainMenu } from "./MainMenu"
import { AUTH_USER } from "operations/queries/authUser"

interface MyBellDeskProps {}

const MyBellDesk: React.FC<MyBellDeskProps> = (props) => {
  const {
    data: dataBellhopList,
    loading: loadingBellhopList,
    error: errorBellhopList,
  } = useSubscription(BELLHOP_LIST)
  const { data: authUserResult } = useQuery(AUTH_USER)
  const { authUser } = authUserResult
  const bellhops = dataBellhopList?.m2_bellhops
  const myBellhops = bellhops?.filter(
    (bellhop) =>
      bellhop.memberships.map((user) => user.user_id).indexOf(authUser.id) > -1
  )

  console.log(bellhops)
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
          bellhops={myBellhops}
          listTitle="My Bellhops"
          backTo="/my-bellhops"
        />
      )}
      {props.computedMatch?.params?.bellhopId && (
        <>
          <BellhopHeader listTitle="My Bellhops" backTo="/my-bellhops" />
          <BellCatalogList className="container mx-auto" whose="mine" />
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
