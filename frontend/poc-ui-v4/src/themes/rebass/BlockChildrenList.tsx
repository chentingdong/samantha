import React from "react"
import { BlockOrDef } from "../../models/interface"
import { MutationType } from "../../models/enum"
import { DndSourceBox } from "../../components/DndSourceBox"
import { BlockCatalogItem } from "./BlockCatalogItem"
import styled from "styled-components"
import { Box, Flex, Image, Heading, Text } from "rebass"

type BlockChildrenListType = {
  blocks: BlockOrDef[]
  onDelete?: (child: BlockOrDef) => void
}

const BlockChildrenListRaw: React.FC<BlockChildrenListType> = ({
  blocks,
  onDelete,
}) => {
  return (
    <Flex mx={-2}>
      {blocks &&
        blocks
          .filter((block) => block.__mutation_type__ !== MutationType.Delete)
          .map((block: BlockOrDef, index: number) => {
            const isLeaf = block.type.includes("LEAF_")
            return (
              <Box
                width={isLeaf ? 1 / 3 : 1}
                px={2}
                key={`${block.id}-${index}`}
              >
                <DndSourceBox type="block" block={block}>
                  <BlockCatalogItem
                    block={block}
                    index={index}
                    onDelete={(child) => onDelete(child)}
                  />
                </DndSourceBox>
              </Box>
            )
          })}
    </Flex>
  )
}

const BlockChildrenList: any = styled(({ ...props }) => (
  <BlockChildrenListRaw {...props} />
))``

export { BlockChildrenList }
