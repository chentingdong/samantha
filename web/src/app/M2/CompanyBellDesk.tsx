import React, { useState } from "react"
import { testingBellhopList } from "../../../data/initialBellhop"
import { Button } from "components"
import styled from "styled-components"
import tw from "tailwind.macro"

interface CompanyBellDeskProps {}

const BellhopItem: React.FC<BellhopItemProps> = ({ bellhop, ...props }) => {
  return (
    <div className="border h-32 lg:h-48 xl:h-64 relative overflow-hidden">
      <img
        className="w-full h-full object-cover opacity-25"
        src={bellhop.image}
        alt=""
      />
      <div className="absolute top-0 left-0 h-full w-full flex content-center">
        <Button className="fill border-0 m-auto w-4/5" color="primary">
          {bellhop.name}
        </Button>
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
