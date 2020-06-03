import React from "react"
import { Block, BlockDef, BlockOrDef } from "../models/interface"
import { BlockChildrenItem } from "./BlockChildrenItem"
import { DndTargetBox } from "./DndTargetBox"
import { MutationType } from "../models/enum"
import tw from "tailwind.macro"
import styled from "styled-components"
import { Panel } from "rsuite"

type BlockChildrenListType = {
  blocks: BlockOrDef[]
  addSubBlock: (child: BlockOrDef) => void
  onDelete?: (child: BlockOrDef) => void
  type: string
}

const BlockChildrenListRaw: React.FC<BlockChildrenListType> = ({
  blocks,
  addSubBlock,
  onDelete,
  type,
}) => {
  return (
    <Panel
      shaded
      collapsible
      defaultExpanded
      bodyFill
      header={
        type === "COMPOSITE_SEQUENTIAL"
          ? "sequential container"
          : "parallel container"
      }
    >
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
    </Panel>
  )
}

const BlockChildrenList: React.FC<BlockChildrenListType> = styled(
  BlockChildrenListRaw
)`
  ${tw`flex-auto`}
`

export { BlockChildrenList }
