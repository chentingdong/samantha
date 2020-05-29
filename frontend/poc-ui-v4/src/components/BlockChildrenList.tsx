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
  ${tw`flex`}
  .composite {
    ${tw`flex-auto m-1 ml-2`}
    display: block;
    .card-header {
      background: var(--color-bg-default);
    }
    .leaf {
      ${tw`flex-auto m-1 ml-8`}
      display: inline-block;
      .card-header {
        background: var(--color-bg-inverse);
      }
    }
  }
`

export { BlockChildrenList }
