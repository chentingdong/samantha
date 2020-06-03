import React from "react"
import { Block, BlockDef, BlockOrDef } from "../models/interface"
import { SegmentView } from "./SegmentView"
import { DndSourceBox } from "./DndSourceBox"
import { Card } from "./Card"
import styled from "styled-components"
import { Icon } from "rsuite"

const BlockChildrenItemRaw: React.FC<{
  block: BlockOrDef
  index?: number
  onDelete?: (child: BlockOrDef) => void
}> = ({ block, index = 0, onDelete }) => {
  const isLeaf = block.type.includes("LEAF_")
  return (
    <Card className={`${isLeaf ? "leaf" : "composite"} theme-dark`}>
      <DndSourceBox type="block" block={block}>
        <div className="card-header">
          {index + 1}
          <span className="p-2">-</span>
          {block.name}
          <Icon
            icon="close"
            className="float-right m-1"
            onClick={() => onDelete(block)}
          />
        </div>
        <div className="card-body">{block.description}</div>
        <SegmentView block={block} />
      </DndSourceBox>
    </Card>
  )
}

const BlockChildrenItem = styled(BlockChildrenItemRaw)``
export { BlockChildrenItem }
