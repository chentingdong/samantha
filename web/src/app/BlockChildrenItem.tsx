import React from "react"
import { BlockOrDef } from "../models/interface"
import { DndSourceBox } from "../components/DndSourceBox"
import { Card } from "../components/Card"
import styled from "styled-components"
import { Icon } from "rsuite"
import { getIconByType } from "../utils/Styles"
import { BlockChildrenList } from "./BlockChildrenList"
import { useQuery } from "@apollo/client"
import { UI_STATE } from "../operations/queries/uiState"
import { deleteOneBlock } from "../operations/blockOperations"
import { EditMode } from "../models/enum"
import { useBlockMutations } from "../operations/mutations"

const BlockChildrenItemRaw: React.FC<{
  block: BlockOrDef
  parent: BlockOrDef
  index?: number
}> = ({ block, parent, index = 0 }) => {
  const { data, loading, error } = useQuery(UI_STATE)
  const isLeaf = block.type.includes("LEAF_")
  const [createFn, updateFn, deleteFn] = useBlockMutations(
    data?.uiState?.editingTypename
  )

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
