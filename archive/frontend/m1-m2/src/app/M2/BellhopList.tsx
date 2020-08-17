import React, { useState } from "react"
import { Bellhop } from "models/interface"
import { BellhopThumbnail } from "./BellhopItem"

export interface BellhopThumbnailListProps {
  listTitle: string
  backTo: string
  bellhops: Bellhop[]
}

const BellhopThumbnailList: React.FC<BellhopThumbnailListProps> = ({
  bellhops,
  listTitle = "",
  backTo,
  ...props
}) => {
  return (
    <div className="container m-auto" {...props}>
      <h4 className="my-4">{listTitle}</h4>
      <div className="p-8 grid gap-16 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {bellhops?.map((bellhop: Bellhop, index: number) => {
          return (
            <BellhopThumbnail key={index} bellhop={bellhop} backTo={backTo} />
          )
        })}
      </div>
    </div>
  )
}

export { BellhopThumbnailList }
