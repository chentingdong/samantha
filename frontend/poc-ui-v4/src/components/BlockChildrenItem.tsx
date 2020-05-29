import React from "react"
import { Block, BlockDef, BlockOrDef } from "../models/interface"
import { SegmentView } from "./SegmentView"
import { DndSourceBox } from "./DndSourceBox"
import { Card } from "./Card"

const BlockChildrenItem: React.FC<{
  block: BlockOrDef
  index?: number
  onDelete?: (child: BlockOrDef) => void
}> = ({ block, index = 0, onDelete }) => {
  return (
    <Card>
      <DndSourceBox type="block" block={block}>
        <Card className="border-none">
          <strong className="card-header">
            <button
              className="close"
              aria-label="Close"
              onClick={() => onDelete(block)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            {index + 1}
            <span className="p-2">-</span>
            {block.name}
          </strong>
          <div className="card-body">{block.description}</div>
          <SegmentView block={block} />
        </Card>
      </DndSourceBox>
    </Card>
  )
}

export { BlockChildrenItem }
