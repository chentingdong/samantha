import React from "react"
import { BlockDef } from "../models/interface"
import { DndSourceBox } from "./DndSourceBox"

const BlockCatalogItem: React.FC<{
  blockDef: BlockDef
}> = ({ blockDef }) => {
  return (
    <div className="p-2 col-6">
      <div className="card">
        <DndSourceBox type="block" block={blockDef}>
          <div className="card">
            <strong className="card-header">{blockDef.name}</strong>
            <div className="card-body">{blockDef.description}</div>
          </div>
        </DndSourceBox>
      </div>
    </div>
  )
}

export { BlockCatalogItem }
