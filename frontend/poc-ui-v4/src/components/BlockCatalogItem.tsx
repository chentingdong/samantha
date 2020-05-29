import React from "react"
import { BlockDef } from "../models/interface"
import { DndSourceBox } from "./DndSourceBox"
import { Card } from "./Card"

const BlockCatalogItem: React.FC<{
  blockDef: BlockDef
}> = ({ blockDef }) => {
  return (
    <Card className="">
      <DndSourceBox type="block" block={blockDef}>
        <div className="text-sm">
          <strong className="card-header">{blockDef.name}</strong>
          <div className="card-body">{blockDef.description}</div>
        </div>
      </DndSourceBox>
    </Card>
  )
}

export { BlockCatalogItem }
