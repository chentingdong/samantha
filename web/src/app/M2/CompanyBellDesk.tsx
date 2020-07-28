// CompanyBellDesk.tsx
import React from "react"
import { BellhopThumbnailList } from "./BellhopList"
import { BellhopHeader } from "./BellhopHeader"
import { useQuery, useSubscription } from "@apollo/client"
import { BellCatalogList } from "./BellCatalogList"
import { MainMenu } from "./MainMenu"
import { Loading, Error } from "components/Misc"
import { BELLHOP_LIST } from "operations/subscriptions/bellhopList"
import { UI_STATE } from "operations/queries/uiState"

interface CompanyBellDeskProps {}

const CompanyBellDesk: React.FC<CompanyBellDeskProps> = (props) => {
  const { data, loading, error } = useSubscription(BELLHOP_LIST, {})

  const {
    data: { uiState },
  } = useQuery(UI_STATE)

  const listTitle = "All Bellhops"

  if (loading) return <Loading />
  const bellhops = data.m2_bellhops
  return (
    <div className="">
      <MainMenu className="md-8" />
      {error && <Error message={error.message} />}
      {!uiState.currentBellhopId && (
        <BellhopThumbnailList bellhops={bellhops} listTitle={listTitle} />
      )}
      {uiState.currentBellhopId && (
        <>
          <BellhopHeader listTitle={listTitle} />
          <BellCatalogList className="container mx-auto" />
        </>
      )}
    </div>
  )
}

export { CompanyBellDesk }
