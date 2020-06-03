import React from "react"
import { Block, BlockDef, BlockOrDef } from "../models/interface"
import { DndSourceBox } from "./DndSourceBox"
import { Card } from "./Card"
import styled from "styled-components"
import { Icon, Notification } from "rsuite"
import { getIconByType } from "../utils/Styles"
import { BlockChildrenList } from "./BlockChildrenList"

const BlockChildrenItemRaw: React.FC<{
  block: BlockOrDef
  index?: number
}> = ({ block, index = 0 }) => {
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
            onClick={() => {
              const {
                id,
                name,
                parent: { id: pid, name: pname },
              } = block
              Notification.info({
                title: "deleting a block",
                description: JSON.stringify(
                  { name, parent: { pname } },
                  null,
                  2
                ),
              })
            }}
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
