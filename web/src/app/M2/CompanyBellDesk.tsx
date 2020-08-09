// CompanyBellDesk.tsx
import React from "react"
import { BellhopThumbnailList } from "./BellhopList"
import { BellhopHeader } from "./BellhopHeader"
import { useSubscription } from "@apollo/client"
import { BellCatalogList } from "./BellCatalogList"
import { Loading, Error } from "components/Misc"
import { BELLHOP_LIST } from "operations/subscriptions/bellhopList"
import { useLocation } from "react-router-dom"
import { getRouteParams } from "utils/router"

interface CompanyBellDeskProps {}

const CompanyBellDesk: React.FC<CompanyBellDeskProps> = (props) => {
  const listTitle = "All Bellhops"
  const location = useLocation()
  const params = getRouteParams(location)
  console.log(params)
  const { data, loading, error } = useSubscription(BELLHOP_LIST)
  if (loading) return <Loading />

  const bellhops = data?.m2_bellhops
  const bellhopId = params.bellhopId
  const bellhop = bellhops?.filter((b) => b.id === bellhopId)[0]

  return (
    <div className="">
      {error && <Error message={error.message} />}
      {!bellhop && (
        <BellhopThumbnailList
          bellhops={bellhops}
          listTitle={listTitle}
          backTo="/bellhops/all"
        />
      )}
      {bellhop && (
        <>
          <BellhopHeader
            listTitle={listTitle}
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
