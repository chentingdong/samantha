import React, { useState } from "react"
import { Bellhop } from "models/interface"
import { BellhopThumbnail } from "./BellhopItem"
import { TODO } from "components/Todo"

export interface BellhopThumbnailListProps {
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
      <TODO> write up subscription for bellhop list, with fiters</TODO>
      <h4 className="my-4">{listTitle}</h4>
      <div className="p-8 grid gap-16 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {bellhops?.map((bellhop: Bellhop, index: number) => {
          return <BellhopThumbnail key={index} bellhop={bellhop} />
        })}
      </div>
    </div>
  )
}

export { BellhopThumbnailList }
