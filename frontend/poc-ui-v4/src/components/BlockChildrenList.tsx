import React from "react"
import { Block, BlockDef, BlockOrDef } from "../models/interface"
import { BlockChildrenItem } from "./BlockChildrenItem"
import { DndTargetBox } from "./DndTargetBox"
import { MutationType } from "../models/enum"
import tw from "tailwind.macro"
import styled from "styled-components"

type BlockChildrenListType = {
  blocks: BlockOrDef[]
  addSubBlock: (child: BlockOrDef) => void
  onDelete?: (child: BlockOrDef) => void
  className?: string
}

const BlockChildrenListRaw: React.FC<BlockChildrenListType> = ({
  blocks,
  addSubBlock,
  onDelete,
  className,
}) => {
  return (
    <div className={className}>
      <DndTargetBox
        accept="block"
        greedy={false}
        onDrop={(childBlock) => addSubBlock(childBlock)}
      >
        {blocks
          .filter((block) => block.__mutation_type__ !== MutationType.Delete)
          .map((block: BlockOrDef, index: number) => {
            const isLeaf = block.type.includes("LEAF_")
            return (
              <div className={isLeaf ? "leaf" : "composite"} key={block.id}>
                <BlockChildrenItem
                  block={block}
                  index={index}
                  key={block.id}
                  onDelete={(child) => onDelete(child)}
                />
              </div>
            )
          })}
      </DndTargetBox>
    </div>
  )
}

const BlockChildrenList: React.FC<BlockChildrenListType> = styled(
  BlockChildrenListRaw
)`
  ${tw`flex-auto m-1`}
  .composite {
    display: block;
  }
  .leaf {
    ${tw`ml-2 mr-2`}
    display: inline-block;
  }
`

export { BlockChildrenList }
