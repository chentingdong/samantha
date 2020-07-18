import React, { useState } from "react"
import { testingBellhopList } from "../../../data/initialBellhop"
import { Bellhop } from "models/interface"
import { BellhopItem } from "./BellHopItem"

interface CompanyBellDeskProps {}

const CompanyBellDesk: React.FC<CompanyBellDeskProps> = (props) => {
  // TODO write up query for bellhop list, with fiters
  // const { loading, error, data } = useQuery(Bellhop)
  // const [bellhops, setBellhops] = useState(testingBellhopList)
  const bellhops = testingBellhopList
  const listTitle = "All Bellhops"

  return (
    bellhops && (
      <div {...props}>
        <h4 className="my-4">{listTitle}</h4>
        <div className="grid gap-16 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {bellhops?.map((bellhop: Bellhop, index: number) => {
            return <BellhopItem key={index} bellhop={bellhop} />
          })}
        </div>
      </div>
    )
  )
}

export { CompanyBellDesk }
