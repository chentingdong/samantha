import React from "react"
import { Block } from "../../models/interface"
import { MutationType } from "../../models/enum"
import { DndSourceBox } from "../../components/DndSourceBox"
import { BlockCatalogItem } from "./BlockCatalogItem"
import { Row, Col } from "antd"
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
    <Row gutter={2}>
      {blocks &&
        blocks
          .filter((block) => block.__mutation_type__ !== MutationType.Delete)
          .map((block: Block, index: number) => {
            const isLeaf = block.type.includes("LEAF_")
            return (
              <Col flex={isLeaf ? 4 : 8} key={`${block.id}-bcl`}>
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

const Styles = styled.div.attrs({})``

const BlockChildrenList: React.FC<BlockChildrenListType> = ({ ...props }) => {
  return (
    <Styles>
      <BlockChildrenListRaw {...props} />
    </Styles>
  )
}
export { BlockChildrenList }
