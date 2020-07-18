import React, { useState } from "react"
import { testingBellhopList } from "../../../data/initialBellhop"
import { Bellhop } from "models/interface"
import { BellhopThumbnail } from "./BellhopThumbnail"
import { BellhopContent } from "./BellhopContent"
import { Button } from "components"

interface CompanyBellDeskProps {}

const CompanyBellDesk: React.FC<CompanyBellDeskProps> = (props) => {
  // TODO write up query for bellhop list, with fiters
  // const { loading, error, data } = useQuery(Bellhop)
  // const [bellhops, setBellhops] = useState(testingBellhopList)
  const bellhops = testingBellhopList
  const listTitle = "All Bellhops"

  return (
    <div className="">
      <div className="container m-auto" {...props}>
        <Button className="my-4 text-white bg-purple-800">{listTitle}</Button>
        <div className="p-8 grid gap-16 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {bellhops?.map((bellhop: Bellhop, index: number) => {
            return <BellhopThumbnail key={index} bellhop={bellhop} />
          })}
        </div>
      </div>
      <BellhopContent />
    </div>
  )
}

export { CompanyBellDesk }
