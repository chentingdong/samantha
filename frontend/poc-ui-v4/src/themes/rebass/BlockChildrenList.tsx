import React from "react"
import { Block } from "models/interface"
import { MutationType } from "models/enum"
import { DndSourceBox } from "components/DndSourceBox"
import { BlockCatalogItem } from "./BlockCatalogItem"
import styled from "styled-components"

type BlockChildrenListType = {
  blocks: Block[]
  onDelete?: (child: Block) => void
}

const BlockChildrenListRaw: React.FC<BlockChildrenListType> = ({
  blocks,
  onDelete,
}) => {
  return (
    <div className="">
      {blocks &&
        blocks
          .filter((block) => block.__mutation_type__ !== MutationType.Delete)
          .map((block: Block, index: number) => {
            const isLeaf = block.type.includes("LEAF_")
            const className = isLeaf ? "leaf" : "composite"

            return (
              <div className={className} key={`${block.id}-bcl`}>
                <DndSourceBox type="block" block={block}>
                  <BlockCatalogItem
                    block={block}
                    index={index}
                    onDelete={(child) => onDelete(child)}
                  />
                </DndSourceBox>
              </div>
            )
          })}
    </div>
  )
}

const BlockChildrenList: React.FC<BlockChildrenListType> = styled(
  ({ ...props }) => <BlockChildrenListRaw {...props} />
)`
  border: 1px solid red;

  .leaf: {
    display: inline-block;
    border: 1px solid red;
  }
  .composite {
    display: block;
    border: 1px solid ${(props) => props.theme.shadow};
  }
`

export { BlockChildrenList }
