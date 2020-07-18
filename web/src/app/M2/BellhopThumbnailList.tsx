import React, { useState } from "react"
import { Bellhop } from "models/interface"
import { BellhopThumbnail } from "./BellhopThumbnail"
import { Button } from "components/Button"

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
      <Button className="my-4 text-white bg-purple-800">{listTitle}</Button>
      <div className="p-8 grid gap-16 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {bellhops?.map((bellhop: Bellhop, index: number) => {
          return <BellhopThumbnail key={index} bellhop={bellhop} />
        })}
      </div>
    </div>
  )
}

export { BellhopThumbnailList }
