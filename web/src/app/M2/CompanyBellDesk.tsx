// CompanyBellDesk.tsx
import React, { useState } from "react"
import { testingBellhopList } from "../../../data/initialBellhop"
import { BellhopThumbnailList } from "./BellhopThumbnailList"
import { BellhopContent } from "./BellhopContent"
import { useQuery, useSubscription } from "@apollo/client"
import { UI_STATE } from "../../operations/queries/uiState"
import { Error } from "../../components/Misc"
import { Loader } from "rsuite"
import { BellCatalogList } from "./BellCatalogList"
import { TODO } from "components/TODO"

interface CompanyBellDeskProps {}

const CompanyBellDesk: React.FC<CompanyBellDeskProps> = (props) => {
  // const { loading, error, data } = useQuery(Bellhop)
  // const [bellhops, setBellhops] = useState(testingBellhopList)
  const bellhops = testingBellhopList
  const listTitle = "All Bellhops"
  const {
    data: { uiState },
    loading,
    error,
  } = useQuery(UI_STATE)

  if (loading) return <Loader speed="fast" content="Loading..." />
  if (error) return <Error message={error.message} />

  return (
    <div className="">
      {!uiState.currentBellhopId && (
        <BellhopThumbnailList bellhops={bellhops} listTitle={listTitle} />
      )}
      {uiState.currentBellhopId && <BellhopContent listTitle={listTitle} />}
      <div className="container mx-auto mt-8">
        <TODO>
          load bell is_definition=true on current bellhop id:
          <i>{uiState.currentBellhopId}</i>
        </TODO>
        <BellCatalogList />
      </div>
    </div>
  )
}

export { CompanyBellDesk }
