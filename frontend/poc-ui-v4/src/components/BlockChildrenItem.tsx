import React from "react"
import { BlockOrDef } from "../models/interface"
import { DndSourceBox } from "./DndSourceBox"
import { Card } from "./Card"
import styled from "styled-components"
import { Icon } from "rsuite"
import { getIconByType } from "../utils/Styles"
import { BlockChildrenList } from "./BlockChildrenList"
import { useQuery, useMutation } from "@apollo/client"
import { UI_STATE } from "../operations/queries/uiState"
import { deleteOneBlock } from "../operations/blockOperations"
import { EditMode } from "../models/enum"
import { DELETE_ONE_BLOCK } from "../operations/mutations/deleteOneBlock"
import { DELETE_ONE_BLOCK_DEF } from "../operations/mutations/deleteOneBlockDef"
import { REQUEST_CATALOG } from "../operations/queries/requestCatalog"
import { REQUESTS_MADE } from "../operations/queries/requestsMade"
import { REQUESTS_RECEIVED } from "../operations/queries/requestsReceived"

const BlockChildrenItemRaw: React.FC<{
  block: BlockOrDef
  parent: BlockOrDef
  index?: number
}> = ({ block, parent, index = 0 }) => {
  const { data, loading, error } = useQuery(UI_STATE)
  const isLeaf = block.type.includes("LEAF_")
  const [deleteOneBlockMutation] = useMutation(DELETE_ONE_BLOCK, {
    refetchQueries: [{ query: REQUESTS_MADE }, { query: REQUESTS_RECEIVED }],
  })
  const [deleteOneBlockDefMutation] = useMutation(DELETE_ONE_BLOCK_DEF, {
    refetchQueries: [{ query: REQUEST_CATALOG }],
  })
  const deleteFn =
    data?.uiState?.editingTypename === "Block"
      ? deleteOneBlockMutation
      : deleteOneBlockDefMutation

  return (
    <Card className={`${isLeaf ? "leaf" : "composite"} theme-dark`}>
      <DndSourceBox type="block" block={block}>
        <div className="card-header">
          <Icon icon={getIconByType(block.type)} />
          {block.name}
          <Icon
            icon="close"
            className="float-right m-1"
            onClick={(e) => {
              const syncRemote = data?.uiState?.editorMode === EditMode.Edit
              deleteOneBlock(
                data?.uiState?.draftBlock,
                block,
                parent,
                syncRemote,
                deleteFn
              )
            }}
          />
        </div>
        <div className="card-body">{block.description}</div>
        {block.type.includes("COMPOSITE") && (
          <BlockChildrenList
            blocks={block.children}
            parent={block}
            type={block.type}
          />
        )}
      </DndSourceBox>
    </Card>
  )
}

const BlockChildrenItem = styled(BlockChildrenItemRaw)``
export { BlockChildrenItem }
