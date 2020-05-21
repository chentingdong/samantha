import React from "react"
import { Block } from "../models/interface"
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

const BlockCatalogItemV3: React.FC<BlockCatalogItemType> = ({
  block,
  index = 0,
  onDelete,
  className = "",
}) => {
  const isLeaf = block.type.includes("LEAF_")
  const headerClass = isLeaf ? "leaf" : ""
  return (
    <div className={className} key={block.id}>
      <Box className={`header ${headerClass}`}>
        <span>{index + 1}</span> - <span>{block.name}</span>
        <IconButton
          className="close"
          aria-label="close"
          component="span"
          onClick={() => onDelete(block)}
        >
          <Close />
        </IconButton>
      </Box>
      <div className="body">
        <p> {block.description} </p>
        <SegmentView block={block} />
      </div>
    </div>
  )
}

const BlockCatalogItem: React.FC<BlockCatalogItemType> = styled(
  BlockCatalogItemV3
)`
  border-radius: 6px;
  box-shadow: none;
  .header {
    border-radius: 4px 4px 0 0;
    position: relative;
    line-height: 0.5em;
    color: ${(props) => props.theme.palette?.secondary.contrastText};
    background: ${(props) => props.theme.palette?.secondary.main};
    &.leaf {
      color: ${(props) => props.theme.palette?.primary.contrastText};
      background: ${(props) => props.theme.palette?.primary.main};
    }
    .close {
      position: absolute;
      padding: 0;
      right: 0;
      top: 0;
    }
  }
  .header,
  .body {
    padding: 0.5em;
  }
`
export { BlockCatalogItem }
