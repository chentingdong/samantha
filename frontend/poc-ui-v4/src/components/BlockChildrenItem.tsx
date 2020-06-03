import React from "react"
import { Block, BlockDef, BlockOrDef } from "../models/interface"
import { DndSourceBox } from "./DndSourceBox"
import { Card } from "./Card"
import styled from "styled-components"
import { Icon, Notification } from "rsuite"
import { getIconByType } from "../utils/Styles"
import { BlockChildrenList } from "./BlockChildrenList"
import cloneDeep from "lodash/cloneDeep"
import { setUiState } from "../operations/mutations/setUiState"
import { useQuery } from "@apollo/client"
import { UI_STATE } from "../operations/queries/uiState"

const BlockChildrenItemRaw: React.FC<{
  block: BlockOrDef
  index?: number
}> = ({ block, index = 0 }) => {
  const { data, loading, error } = useQuery(UI_STATE)
  const isLeaf = block.type.includes("LEAF_")

  const findBlock = (root, target) => {
    if (root.id === target.id) return root
    let found
    for (const child of root.children) {
      found = findBlock(child, target)
      if (found) return found
    }
    return null
  }

  const deleteOneBlock = (childBlock) => {
    const {
      id,
      name,
      parent: { id: pid, name: pname },
    } = block
    Notification.info({
      title: "deleting a block",
      description: `"${block.name}" from parent "${block.parent.name}"`,
    })
    const newDraftBlock = cloneDeep(data?.uiState?.draftBlock)
    const newParent = findBlock(newDraftBlock, childBlock.parent)
    newParent.children.splice(
      newParent.children.findIndex((child) => child.id === childBlock.id),
      1
    )
    setUiState({ draftBlock: newDraftBlock })
  }

  return (
    <Card className={`${isLeaf ? "leaf" : "composite"} theme-dark`}>
      <DndSourceBox type="block" block={block}>
        <div className="card-header">
          <Icon icon={getIconByType(block.type)} />
          {block.name}
          <Icon
            icon="close"
            className="float-right m-1"
            onClick={(e) => deleteOneBlock(block)}
          />
        </div>
        <div className="card-body">{block.description}</div>
        {block.children.length > 0 && (
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
