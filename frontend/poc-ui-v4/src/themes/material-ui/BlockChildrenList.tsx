import React from "react"
import { Block } from "models/interface"
import { MutationType } from "models/enum"
import { DndSourceBox } from "components/DndSourceBox"
import { BlockCatalogItem } from "./BlockCatalogItem"
import { DndTargetBox } from "components/DndTargetBox"
import { Box, Grid, Paper } from "@material-ui/core"

const BlockChildrenList: React.FC<{
  blocks: Block[]
  onDelete?: (child: Block) => void
}> = ({ blocks, onDelete }) => {
  return (
    <Grid container spacing={3}>
      {blocks &&
        blocks
          .filter((block) => block.__mutation_type__ !== MutationType.Delete)
          .map((block: Block, index: number) => {
            const className = block.type.includes("LEAF_")
              ? "bh-leaf"
              : "bh-composit"
            return (
              <Grid item className={className} key={`${block.id}-bcl`}>
                <Paper>
                  <DndSourceBox type="block" block={block}>
                    <BlockCatalogItem
                      block={block}
                      index={index}
                      onDelete={(child) => onDelete(child)}
                    />
                  </DndSourceBox>
                </Paper>
              </Grid>
            )
          })}
    </Grid>
  )
}

export { BlockChildrenList }
