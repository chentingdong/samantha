import React from "react"
import { Block } from "#/models/interface"
import { SegmentView } from "./SegmentView"
import { IconButton, Box } from "@material-ui/core"
import { Close } from "@material-ui/icons"
import styled from "styled-components"

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
  const headerClass = isLeaf ? "leaf" : ""
  return (
    <Box className={className} key={block.id}>
      <div className={`header ${headerClass}`}>
        <span>{index + 1}</span> - <span>{block.name}</span>
        <IconButton
          className="close"
          aria-label="close"
          component="span"
          onClick={() => onDelete(block)}
        >
          <Close />
        </IconButton>
      </div>
      <div className="body">
        <p> {block.description} </p>
        <SegmentView block={block} />
      </div>
    </Box>
  )
}

const BlockCatalogItem = styled(({ theme, ...props }) => (
  <BlockCatalogItemContainerView {...props} />
))`
  border-radius: 6px;
  box-shadow: none;
  font-family: ${(props) => props.theme.typography?.fontFamily};
  font-size: ${(props) => props.theme.typography?.fontSize}px;
  .header {
    border-radius: 4px 4px 0 0;
    position: relative;
    line-height: 0.7em;
    color: ${(props) => props.theme.palette?.secondary.contrastText};
    background: linear-gradient(
      ${(props) => props.theme.colors?.secondary},
      #000
    );
    &.leaf {
      color: ${(props) => props.theme.palette?.primary.contrastText};
      background: linear-gradient(
        ${(props) => props.theme.palette?.primary.main},
        #666
      );
    }
    .close {
      color: ${(props) => props.theme.palette?.primary.contrastText};
      position: absolute;
      padding: 0;
      right: 0;
      top: 5px;
      height: ${(props) => props.theme.typography?.fontSize}px;
    }
  }
  .header,
  .body {
    padding: 0.5em;
  }
  .body {
    background: ${(props) => props.theme.colors?.bgLight};
  }
`
export { BlockCatalogItem }
