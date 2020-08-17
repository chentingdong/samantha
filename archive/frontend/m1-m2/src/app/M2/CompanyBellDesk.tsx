import { Error, Loading } from "components/Misc"

import { BELLHOP_LIST } from "operations/subscriptions/bellhopList"
import { BellCatalogList } from "./BellCatalogList"
import { BellhopHeader } from "./BellhopHeader"
import { BellhopThumbnailList } from "./BellhopList"
// CompanyBellDesk.tsx
import React from "react"
import { getRouteParams } from "utils/router"
import { useLocation } from "react-router-dom"
import { useSubscription } from "@apollo/client"

interface CompanyBellDeskProps {}

const CompanyBellDesk: React.FC<CompanyBellDeskProps> = (props) => {
  const location = useLocation()
  const params = getRouteParams(location.pathname)
  console.log(params)
  const { data, loading, error } = useSubscription(BELLHOP_LIST)
  if (loading) return <Loading />

  const bellhops = data?.m2_bellhops
  const bellhop = bellhops?.filter((b) => b.id === params.bellhopId)[0]

  return (
    <div className="">
      {error && <Error message={error.message} />}
      {!bellhop && (
        <BellhopThumbnailList
          bellhops={bellhops}
          listTitle="All Bellhops"
          backTo="/bellhops/all"
        />
      )}
      {bellhop && (
        <>
          <BellhopHeader
            listTitle="All Bellhops"
            bellhop={bellhop}
            backTo="/bellhops/all"
          />
          <BellCatalogList className="container mx-auto" />
        </>
      )}
    </div>
  )
}

export { CompanyBellDesk }
