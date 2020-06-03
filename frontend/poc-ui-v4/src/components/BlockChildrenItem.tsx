import React from "react"
import { BlockOrDef } from "../models/interface"
import { DndSourceBox } from "./DndSourceBox"
import { Card } from "./Card"
import styled from "styled-components"
import { Icon } from "rsuite"
import { getIconByType } from "../utils/Styles"
import { BlockChildrenList } from "./BlockChildrenList"
import { useQuery } from "@apollo/client"
import { UI_STATE } from "../operations/queries/uiState"
import { deleteOneBlock } from "../operations/blockOperations"

const BlockChildrenItemRaw: React.FC<{
  block: BlockOrDef
  parent: BlockOrDef
  index?: number
}> = ({ block, parent, index = 0 }) => {
  const { data, loading, error } = useQuery(UI_STATE)
  const isLeaf = block.type.includes("LEAF_")

  return (
    <Card className={`${isLeaf ? "leaf" : "composite"} theme-dark`}>
      <DndSourceBox type="block" block={block}>
        <div className="card-header">
          <Icon icon={getIconByType(block.type)} />
          {block.name}
          <Icon
            icon="close"
            className="float-right m-1"
            onClick={(e) =>
              deleteOneBlock(data?.uiState?.draftBlock, block, parent)
            }
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
