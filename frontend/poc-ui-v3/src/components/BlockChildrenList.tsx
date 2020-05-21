import React from "react"
import { Block, BlockDef, BlockOrDef } from "../models/interface"
import { DndSourceBox } from "./DndSourceBox"
import { BlockChildrenItem } from "./BlockChildrenItem"
import { DndTargetBox } from "./DndTargetBox"
import { MutationType } from "../models/enum"

const BlockChildrenList: React.FC<{
  blocks: BlockOrDef[]
  onDelete?: (child: BlockOrDef) => void
}> = ({ blocks, onDelete }) => {
  return (
    <>
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
    </>
  )
}

export { BlockChildrenList }
