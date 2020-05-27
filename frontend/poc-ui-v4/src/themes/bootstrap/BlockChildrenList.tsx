import React from "react"
import { BlockOrDef } from "../../models/interface"
import { MutationType } from "../../models/enum"
import { DndSourceBox } from "../../components/DndSourceBox"
import { BlockCatalogItem } from "./BlockCatalogItem"
import styled from "styled-components"

type BlockChildrenListType = {
  blocks: BlockOrDef[]
  onDelete?: (child: BlockOrDef) => void
}

const BlockChildrenListRaw: React.FC<BlockChildrenListType> = ({
  blocks,
  onDelete,
}) => {
  return (
    <div className="row p-1">
      {blocks &&
        blocks
          .filter((block) => block.__mutation_type__ !== MutationType.Delete)
          .map((block: BlockOrDef, index: number) => {
            const isLeaf = block.type.includes("LEAF_")
            const className = isLeaf ? "leaf col-3" : "composite col-12"

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

const Styles = styled.div.attrs({})`
  background: transparent;
  .leaf: {
    display: inline-block;
  }
  .composite {
    display: block;
  }
`

const BlockChildrenList: React.FC<BlockChildrenListType> = ({ ...props }) => {
  return (
    <Styles>
      <BlockChildrenListRaw {...props} />
    </Styles>
  )
}

export { BlockChildrenList }
