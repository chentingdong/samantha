import React, { useState } from "react"
import { testingBellhopList } from "../../../data/initialBellhop"
import { Button } from "components/Button"
import styled from "styled-components"
import tw from "tailwind.macro"
import { Bellhop } from "models/interface"

interface BellhopItemProps {
  bellhop: Bellhop
}
interface CompanyBellDeskProps {}

const BellhopItem: React.FC<BellhopItemProps> = ({ bellhop, ...props }) => {
  return (
    <div className="relative h-32 overflow-hidden border lg:h-48 xl:h-64">
      <img
        className="object-cover w-full h-full opacity-25"
        src={bellhop.profile_image_url}
        alt=""
      />
      <div className="absolute top-0 left-0 flex content-center w-full h-full">
        <Button className="w-4/5 m-auto fill" color="primary">
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
