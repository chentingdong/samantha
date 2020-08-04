// CompanyBellDesk.tsx
import React from "react"
import { BellhopThumbnailList } from "./BellhopList"
import { BellhopHeader } from "./BellhopHeader"
import { useSubscription } from "@apollo/client"
import { BellCatalogList } from "./BellCatalogList"
import { MainMenu } from "./MainMenu"
import { Loading, Error } from "components/Misc"
import { BELLHOP_LIST } from "operations/subscriptions/bellhopList"

interface CompanyBellDeskProps {}

const CompanyBellDesk: React.FC<CompanyBellDeskProps> = (props) => {
  const { data, loading, error } = useSubscription(BELLHOP_LIST)

  const listTitle = "All Bellhops"

  if (loading) return <Loading />
  const bellhops = data.m2_bellhops
  return (
    <div className="">
      <MainMenu className="md-8" />
      {error && <Error message={error.message} />}
      {!props.computedMatch?.params.bellhopId && (
        <BellhopThumbnailList
          bellhops={bellhops}
          listTitle={listTitle}
          backTo="/company-bell-desk"
        />
      )}
      {props.computedMatch?.params.bellhopId && (
        <>
          <BellhopHeader listTitle={listTitle} backTo="/company-bell-desk" />
          <BellCatalogList className="container mx-auto" />
        </>
      )}
    </div>
  )
}

export { CompanyBellDesk }
