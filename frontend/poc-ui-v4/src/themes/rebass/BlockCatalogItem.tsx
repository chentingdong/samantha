import React from "react"
import { Block } from "models/interface"
import { SegmentView } from "./SegmentView"
import styled from "styled-components"
import { Box, Heading, Text, Button } from "rebass/styled-components"

type BlockCatalogItemType = {
  block: Block
  index?: number
  className?: string
  onDelete?: (child: Block) => void
}

const BlockCatalogItemContainerView: React.FC<BlockCatalogItemType> = ({
  block,
  index = 0,
  onDelete,
  className = "",
}) => {
  const isLeaf = block.type.includes("LEAF_")
  return (
    <Box
      className={`${className}`}
      key={block.id}
      sx={{ display: "grid", gridGap: 3 }}
    >
      <Heading className={`header ${isLeaf ? "leaf" : "composite"}`}>
        <div className="title">
          {index + 1} - {block.name}
        </div>
        <div className="close" onClick={onDelete}>
          x
        </div>
      </Heading>
      <Text className="body">
        <p> {block.description} </p>
        <SegmentView block={block} />
      </Text>
    </Box>
  )
}

const BlockCatalogItem = styled(({ ...props }) => (
  <BlockCatalogItemContainerView {...props} />
))`
  display: block;
  margin: 1em 0;
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.shadows.small};
  border: 1px solid ${(props) => props.theme.colors.blue};
  margin: 2px;
  .header {
    padding: 0 1em;
    padding: 0 0.5em;
    border-radius: ${(props) => props.theme.borderRadius};
    position: relative;
    font-size: 0.9em;
    &.composite {
      color: ${(props) => props.theme.colors.blue};
      background: ${(props) => props.theme.colors.lightgray};
    }
    &.leaf {
      color: ${(props) => props.theme.colors.lightgray};
      background: ${(props) => props.theme.colors.blue};
      .title {
        max-width: calc(100% - 2em);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .body {
    padding: 0.5em;
    color: ${(props) => props.theme.fg};
    background: ${(props) => props.theme.bg};
  }
  .close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    background: none;
    text-decoration: none;
    display: inline-block;
    font-size: 1em;
    padding: 2px 5px;
  }
`
export { BlockCatalogItem }
