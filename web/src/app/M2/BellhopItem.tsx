import React, { useEffect } from "react"
import { Bellhop } from "models/interface"
import { Button } from "components/Button"
import { setUiState } from "operations/mutations/setUiState"

interface BellhopProps {
  bellhop: Bellhop
}

const BellhopThumbnail: React.FC<BellhopProps> = ({ bellhop, ...props }) => {
  const setCurrentBellhop = () => {
    setUiState({
      currentBellhopId: bellhop.id,
    })
  }

  return (
    <div className="relative h-32 overflow-hidden border lg:h-48 xl:h-64">
      <img
        className="object-cover w-full h-full opacity-25"
        src={bellhop.profile_image_url}
        alt=""
      />
      <div className="absolute top-0 left-0 flex content-center w-full h-full">
        <Button
          className="w-4/5 m-auto fill"
          color="primary"
          onClick={setCurrentBellhop}
        >
          {bellhop.name}
        </Button>
      </div>
    </div>
  )
}

export { BellhopThumbnail }
