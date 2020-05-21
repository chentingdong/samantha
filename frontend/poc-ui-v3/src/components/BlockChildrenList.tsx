import React from "react"
import { Block, BlockDef, BlockOrDef } from "../models/interface"
import { BlockChildrenItem } from "./BlockChildrenItem"
import { DndTargetBox } from "./DndTargetBox"
import { MutationType } from "../models/enum"

const BlockChildrenList: React.FC<{
  blocks: BlockOrDef[]
  addSubBlock: (child: BlockOrDef) => void
  onDelete?: (child: BlockOrDef) => void
}> = ({ blocks, addSubBlock, onDelete }) => {
  return (
    <DndTargetBox
      accept="block"
      greedy={false}
      onDrop={(childBlock) => addSubBlock(childBlock)}
    >
      {blocks
        .filter((block) => block.__mutation_type__ !== MutationType.Delete)
        .map((block: BlockOrDef, index: number) => {
          return (
            <BlockChildrenItem
              block={block}
              index={index}
              key={block.id}
              onDelete={(child) => onDelete(child)}
            />
          )
        })}
    </DndTargetBox>
  )
}

export { BlockChildrenList }
