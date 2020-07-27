// CompanyBellDesk.tsx
import React from "react"
import { testingBellhopList } from "../../../data/bellhop"
import { BellhopThumbnailList } from "./BellhopList"
import { BellhopHeader } from "./BellhopHeader"
import { useQuery } from "@apollo/client"
import { UI_STATE } from "operations/queries/uiState"
import { Loading, Error } from "components/Misc"
import { BellCatalogList } from "./BellCatalogList"
import { TODO } from "components/TODO"
import { MainMenu } from "./MainMenu"

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

  return (
    <div className="">
      <MainMenu className="md-8" />
      {loading && <Loading />}
      {error && <Error message={error.message} />}
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
          <BellCatalogList className="m-4" />
        </>
      )}
    </div>
  )
}

export { CompanyBellDesk }
