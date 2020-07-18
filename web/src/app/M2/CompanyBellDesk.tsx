import React, { useState } from "react"
import { testingBellhopList } from "../../../data/initialBellhop"
import { Bellhop } from "models/interface"
import { BellhopThumbnail } from "./BellhopThumbnail"
import { BellhopContent } from "./BellhopContent"
import { Button } from "components/Button"
import { useQuery, useSubscription } from "@apollo/client"
import { UI_STATE } from "../../operations/queries/uiState"

interface CompanyBellDeskProps {}

interface BellhopThumbnailListProps {
  listTitle: string
  bellhops: Bellhop[]
}

const BellhopThumbnailList: React.FC<BellhopThumbnailListProps> = ({
  bellhops,
  listTitle = "",
  ...props
}) => {
  return (
    <div className="container m-auto" {...props}>
      <Button className="my-4 text-white bg-purple-800">{listTitle}</Button>
      <div className="p-8 grid gap-16 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {bellhops?.map((bellhop: Bellhop, index: number) => {
          return <BellhopThumbnail key={index} bellhop={bellhop} />
        })}
      </div>
    </div>
  )
}

const CompanyBellDesk: React.FC<CompanyBellDeskProps> = (props) => {
  // TODO write up query for bellhop list, with fiters
  // const { loading, error, data } = useQuery(Bellhop)
  // const [bellhops, setBellhops] = useState(testingBellhopList)
  const bellhops = testingBellhopList
  const listTitle = "All Bellhops"
  const {
    data: { uiState },
    loading,
  } = useQuery(UI_STATE)

  return (
    <div className="">
      {!uiState.currentBellhopId && (
        <BellhopThumbnailList bellhops={bellhops} listTitle={listTitle} />
      )}
      {uiState.currentBellhopId && <BellhopContent listTitle={listTitle} />}
    </div>
  )
}

export { CompanyBellDesk }
