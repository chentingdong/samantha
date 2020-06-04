import React from "react"
import { BlockOrDef } from "../models/interface"
import { BlockChildrenItem } from "./BlockChildrenItem"
import { DndTargetBox } from "./DndTargetBox"
import { MutationType, EditMode } from "../models/enum"
import tw from "tailwind.macro"
import styled from "styled-components"
import { Panel, Notification } from "rsuite"
import { useQuery, useMutation } from "@apollo/client"
import { UI_STATE } from "../operations/queries/uiState"
import { AUTH_USER } from "../operations/queries/authUser"
import { addOneBlock, moveOneBlock } from "../operations/blockOperations"
import { CREATE_ONE_BLOCK } from "../operations/mutations/createOneBlock"
import { CREATE_ONE_BLOCK_DEF } from "../operations/mutations/createOneBlockDef"
import { REQUESTS_MADE } from "../operations/queries/requestsMade"
import { REQUESTS_RECEIVED } from "../operations/queries/requestsReceived"
import { REQUEST_CATALOG } from "../operations/queries/requestCatalog"

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
  const [createOneBlock] = useMutation(CREATE_ONE_BLOCK, {
    refetchQueries: [{ query: REQUESTS_MADE }, { query: REQUESTS_RECEIVED }],
  })
  const [createOneBlockDef] = useMutation(CREATE_ONE_BLOCK_DEF, {
    refetchQueries: [{ query: REQUEST_CATALOG }],
  })
  const createFn =
    data?.uiState?.editingTypename === "Block"
      ? createOneBlock
      : createOneBlockDef

  return (
    <Panel shaded collapsible defaultExpanded bodyFill>
      <DndTargetBox
        accept={["block", "catalogItem"]}
        greedy={false}
        onDrop={(childBlock, dragType) => {
          const syncRemote = data?.uiState?.editorMode === EditMode.Edit
          if (dragType === "catalogItem")
            addOneBlock(
              data?.uiState?.draftBlock,
              childBlock,
              parent,
              authUser?.authUser,
              syncRemote,
              createFn
            )
          else
            moveOneBlock(
              data?.uiState?.draftBlock,
              childBlock,
              parent,
              syncRemote
            )
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
