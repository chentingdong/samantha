import React from "react"
import {BlockOrDef} from "../../models/interface"
import {MutationType} from "../../models/enum"
import {DndSourceBox} from "../../components/DndSourceBox"
import {BlockCatalogItem} from "./BlockCatalogItem"
import {DndTargetBox} from "../../components/DndTargetBox"
import {Box, Grid, Paper} from "@material-ui/core"

const BlockChildrenList: React.FC<{
  blocks: BlockOrDef[]
  onDelete?: (child: BlockOrDef) => void
}> = ({blocks, onDelete}) => {
  return (
    <Grid container spacing={3}>
      {blocks &&
        blocks
          ?.filter((block) => block.__mutation_type__ !== MutationType.Delete)
          .map((block: BlockOrDef, index: number) => {
            const isLeaf = block.type.includes("LEAF_")
            return (
              <Grid item xs={isLeaf ? 4 : 12} key={`${block.id}-bcl`}>
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

export {BlockChildrenList}
