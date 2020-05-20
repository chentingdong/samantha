import React from "react"
import { Block } from "../models/interface"
import { SegmentView } from "./SegmentView"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import { IconButton, Box, withStyles } from "@material-ui/core"
import { Close } from "@material-ui/icons"
import { green, brown } from "@material-ui/core/colors"

const _BlockCatalogItem: React.FC<{
  block: Block
  index?: number
  onDelete?: (child: Block) => void
}> = ({ block, index = 0, onDelete }) => {
  // TODO: sync with backend of types
  const color = block.type.includes("LEAF_") ? green[200] : brown[200]
  return (
    <div className="" key={block.id}>
      <Box>
        <Box style={{ backgroundColor: color }}>
          <span>{`${index + 1} * ${block.name}`}</span>
          <IconButton
            aria-label="close"
            component="span"
            onClick={() => onDelete(block)}
          >
            <Close />
          </IconButton>
        </Box>
        <Box>
          <p> {block.description} </p>
          <SegmentView block={block} />
        </Box>
      </Box>
    </div>
  )
}

const BlockCatalogItem = withStyles({
  root: {
    backgroundColor: green[200],
  },
})(_BlockCatalogItem)

export { BlockCatalogItem }
