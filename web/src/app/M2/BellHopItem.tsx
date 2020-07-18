import React from "react"
import { Bellhop } from "models/interface"
import { Button } from "components/Button"

interface BellhopItemProps {
  bellhop: Bellhop
}

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

export { BellhopItem }
