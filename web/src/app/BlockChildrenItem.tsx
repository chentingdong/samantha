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
import tw from "tailwind.macro"

const BlockChildrenItemRaw: React.FC<{
  block: BlockOrDef
  parent: BlockOrDef
  index?: number
  className?: string
}> = ({ block, parent, index = 0, className = "" }) => {
  const { data, loading, error } = useQuery(UI_STATE)
  const isLeaf = block.type?.includes("LEAF_")
  const [createFn, updateFn, deleteFn] = useBlockMutations(
    data?.uiState?.editingTypename
  )

  if (loading || error || !data) return <></>

  const { editorMode, draftBlock } = data.uiState

  const handleDeleteClick = (e) => {
    const syncRemote = editorMode === EditMode.Edit
    deleteOneBlock(draftBlock, block, parent, syncRemote, deleteFn)
  }

  return (
    <Card className={`${className} ${isLeaf ? "leaf" : "composite"}`}>
      <DndSourceBox type="block" block={block}>
        <div
          className={`card-header card-header-${isLeaf ? "leaf" : "composite"}`}
        >
          <Icon icon={getIconByType(block.type)} />
          <span className="ml-2">{block.name}</span>
          <Icon
            icon="close"
            className="float-right m-1"
            onClick={handleDeleteClick}
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

const BlockChildrenItem = styled(BlockChildrenItemRaw)`
  ${tw`flex`}
  .card-header-composite {
    color: var(--color-text-warning);
    background: var(--color-bg-warning);
  }
  .card-header-leaf {
    color: var(--color-text-secondary);
    background: var(--color-bg-secondary);
  }
`
export { BlockChildrenItem }
