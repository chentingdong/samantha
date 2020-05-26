import React from "react"
import { Block } from "models/interface"
import { MutationType } from "models/enum"
import { DndSourceBox } from "components/DndSourceBox"
import { BlockCatalogItem } from "./BlockCatalogItem"
import styled from "styled-components"
import { Row, Col } from "rsuite"

type BlockChildrenListType = {
  blocks: Block[]
  onDelete?: (child: Block) => void
}

const BlockChildrenListRaw: React.FC<BlockChildrenListType> = ({
  blocks,
  onDelete,
}) => {
  return (
    <Row className="">
      {blocks &&
        blocks
          .filter((block) => block.__mutation_type__ !== MutationType.Delete)
          .map((block: Block, index: number) => {
            const isLeaf = block.type.includes("LEAF_")
            let className = isLeaf ? "col-span-1" : "col-span-3"
            className = `${className} .shadow-lg`
            return (
              <Col xs={isLeaf ? 3 : 12} key={`${block.id}-bcl`}>
                <DndSourceBox type="block" block={block}>
                  <BlockCatalogItem
                    block={block}
                    index={index}
                    onDelete={(child) => onDelete(child)}
                  />
                </DndSourceBox>
              </Col>
            )
          })}
    </Row>
  )
}

const Styles = styled.div.attrs({})`
  background: var(--color-bg-default);
`

const BlockChildrenList: React.FC<BlockChildrenListType> = ({ ...props }) => {
  return (
    <Styles>
      <BlockChildrenListRaw {...props} />
    </Styles>
  )
}
export { BlockChildrenList }
