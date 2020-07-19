// CompanyBellDesk.tsx
import React, { useState } from "react"
import { testingBellhopList } from "../../../data/initialBellhop"
import { BellhopThumbnailList } from "./BellhopList"
import { BellhopHeader } from "./BellhopHeader"
import { useQuery, useSubscription } from "@apollo/client"
import { UI_STATE } from "../../operations/queries/uiState"
import { Error } from "../../components/Misc"
import { Loader, Icon } from "rsuite"
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
      {uiState.currentBellhopId && (
        <>
          <BellhopHeader listTitle={listTitle} />
          <TODO>
            load bell is_definition=true on current bellhop id:
            <i>{uiState.currentBellhopId}</i>
          </TODO>
          <BellCatalogList className="container m-auto" />
        </>
      )}
    </div>
  )
}

export { CompanyBellDesk }
