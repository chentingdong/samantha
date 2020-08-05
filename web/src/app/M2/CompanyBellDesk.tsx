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
  const listTitle = "All Bellhops"
  const { data, loading, error } = useSubscription(BELLHOP_LIST)
  if (loading) return <Loading />

  const bellhops = data?.m2_bellhops
  const bellhopId = props.computedMatch?.params.bellhopId
  const bellhop = bellhops?.filter((b) => b.id === bellhopId)[0]

  return (
    <div className="">
      <MainMenu className="md-8" />
      {error && <Error message={error.message} />}
      {!bellhop && (
        <BellhopThumbnailList
          bellhops={bellhops}
          listTitle={listTitle}
          backTo="/all-bellhops"
        />
      )}
      {bellhop && (
        <>
          <BellhopHeader
            listTitle={listTitle}
            bellhop={bellhop}
            backTo="/all-bellhops"
          />
          <BellCatalogList className="container mx-auto" />
        </>
      )}
    </div>
  )
}

export { CompanyBellDesk }
