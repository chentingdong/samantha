import React from "react"
import { Block } from "models/interface"
import { MutationType } from "models/enum"
import { DndSourceBox } from "components/DndSourceBox"
import { BlockCatalogItem } from "./BlockCatalogItem"
import { DndTargetBox } from "components/DndTargetBox"
import { Box } from "@material-ui/core"

const BlockChildrenList: React.FC<{
  blocks: Block[]
  onDelete?: (child: Block) => void
}> = ({ blocks, onDelete }) => {
  return (
    <div className="">
      {blocks &&
        blocks
          .filter((block) => block.__mutation_type__ !== MutationType.Delete)
          .map((block: Block, index: number) => {
            const blockWidth = block.type.includes("LEAF_") ? "col-4" : "col"
            const blockDisplay = block.type.includes("LEAF_")
              ? "d-inline-block"
              : "d-block"
            return (
              <div
                className={`p-2 ${blockWidth} ${blockDisplay}`}
                key={`${block.id}-bcl`}
              >
                <Box>
                  <DndSourceBox type="block" block={block}>
                    <BlockCatalogItem
                      block={block}
                      index={index}
                      onDelete={(child) => onDelete(child)}
                    />
                  </DndSourceBox>
                </Box>
              </div>
            )
          })}
    </div>
  )
}

export { BlockChildrenList }
