import React from "react"
import { Block, BlockDef, BlockOrDef } from "../models/interface"
import { SegmentView } from "./SegmentView"
import { DndSourceBox } from "./DndSourceBox"
import { Card } from "./Card"
import { Close } from "./Close"
import styled from "styled-components"

const BlockChildrenItemRaw: React.FC<{
  block: BlockOrDef
  index?: number
  onDelete?: (child: BlockOrDef) => void
}> = ({ block, index = 0, onDelete }) => {
  return (
    <DndSourceBox type="block" block={block}>
      <Card className="border-none">
        <div className="card-header">
          {index + 1}
          <span className="p-2">-</span>
          {block.name}
          <Close className="float-right" onClick={() => onDelete(block)} />
        </div>
        <div className="card-body">{block.description}</div>
        <SegmentView block={block} />
      </Card>
    </DndSourceBox>
  )
}

const BlockChildrenItem = styled(BlockChildrenItemRaw)``
export { BlockChildrenItem }
