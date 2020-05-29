import React from "react"
import { BlockOrDef } from "../../models/interface"
import { MutationType } from "../../models/enum"
import { DndSourceBox } from "../../components/DndSourceBox"
import { BlockCatalogItem } from "./BlockCatalogItem"
import { Row, Col } from "antd"
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
    <Row gutter={2}>
      {blocks &&
        blocks
          .filter((block) => block.__mutation_type__ !== MutationType.Delete)
          .map((block: BlockOrDef, index: number) => {
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

const BlockChildrenList = styled(BlockChildrenListRaw)``

export { BlockChildrenList }
