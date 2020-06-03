import React from "react"
import { BlockOrDef } from "../models/interface"
import { BlockChildrenItem } from "./BlockChildrenItem"
import { DndTargetBox } from "./DndTargetBox"
import { MutationType } from "../models/enum"
import tw from "tailwind.macro"
import styled from "styled-components"
import { Panel, Notification } from "rsuite"
import { useQuery } from "@apollo/client"
import { UI_STATE } from "../operations/queries/uiState"
import { AUTH_USER } from "../operations/queries/authUser"
import { addOneBlock } from "../operations/blockOperations"

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
  const { data, loading, error } = useQuery(UI_STATE)
  const { data: authUser } = useQuery(AUTH_USER)

  return (
    <Panel shaded collapsible defaultExpanded bodyFill>
      <DndTargetBox
        accept={["block", "catalogItem"]}
        greedy={false}
        onDrop={(childBlock, dragType) => {
          if (dragType === "catalogItem")
            addOneBlock(
              data?.uiState?.draftBlock,
              childBlock,
              parent,
              authUser?.authUser
            )
          else Notification.info({ title: `moving a subtree` })
        }}
      >
        {blocks
          .filter((block) => block.__mutation_type__ !== MutationType.Delete)
          .map((block: BlockOrDef, index: number) => {
            return (
              <BlockChildrenItem
                block={block}
                parent={parent}
                index={index}
                key={block.id}
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
  ${tw`flex-auto m-1`}
`

export { BlockChildrenList }
