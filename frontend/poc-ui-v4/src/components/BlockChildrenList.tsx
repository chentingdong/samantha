import React from "react"
import { Block, BlockDef, BlockOrDef } from "../models/interface"
import { BlockChildrenItem } from "./BlockChildrenItem"
import { DndTargetBox } from "./DndTargetBox"
import { MutationType } from "../models/enum"
import tw from "tailwind.macro"
import styled from "styled-components"
import { Panel, Notification } from "rsuite"

type BlockChildrenListType = {
  blocks: BlockOrDef[]
  parent?: BlockOrDef
  type: string
}

const BlockChildrenListRaw: React.FC<BlockChildrenListType> = ({
  blocks,
  parent,
  type,
}) => {
  return (
    <Panel shaded collapsible defaultExpanded bodyFill>
      <DndTargetBox
        accept="block"
        greedy={false}
        onDrop={(childBlock) => {
          const { id, name } = childBlock
          const { id: pid, name: pname } = parent
          Notification.info({
            title: "adding a block",
            description: `from ${JSON.stringify(
              { name },
              null,
              2
            )} to ${JSON.stringify({ pname }, null, 2)}`,
          })
        }}
      >
        {blocks
          .filter((block) => block.__mutation_type__ !== MutationType.Delete)
          .map((block: BlockOrDef, index: number) => {
            return (
              <BlockChildrenItem block={block} index={index} key={block.id} />
            )
          })}
      </DndTargetBox>
    </Panel>
  )
}

const BlockChildrenList: React.FC<BlockChildrenListType> = styled(
  BlockChildrenListRaw
)`
  ${tw`flex-auto m-1`}
`

export { BlockChildrenList }
