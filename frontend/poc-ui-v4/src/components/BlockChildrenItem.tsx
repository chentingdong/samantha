import React from "react"
import { Block, BlockDef, BlockOrDef } from "../models/interface"
import { SegmentView } from "./SegmentView"
import { DndSourceBox } from "./DndSourceBox"
import { Card } from "./Card"
import styled from "styled-components"
import { Icon } from "rsuite"
import { getIconByType } from "../utils/Styles"

const BlockChildrenItemRaw: React.FC<{
  block: BlockOrDef
  index?: number
  onDelete?: (child: BlockOrDef) => void
}> = ({ block, index = 0, onDelete }) => {
  const isLeaf = block.type.includes("LEAF_")
  return (
    <DndSourceBox type="block" block={block}>
      <Card className={`${isLeaf ? "leaf" : "composite"} theme-dark`}>
        <div className="card-header">
          <Icon icon={getIconByType(block.type)} />
          {block.name}
          <Icon
            icon="close"
            className="float-right m-1"
            onClick={() => onDelete(block)}
          />
        </div>
        <div className="card-body">{block.description}</div>
        <SegmentView block={block} />
      </Card>
    </DndSourceBox>
  )
}

const BlockChildrenItem = styled(BlockChildrenItemRaw)``
export { BlockChildrenItem }
