import React from "react"
import { Block, BlockDef } from "../models/interface"
import { DndSourceBox } from "../components/DndSourceBox"
import { BlockCatalogItem } from "../components/BlockCatalogItem"
import { DndTargetBox } from "../components/DndTargetBox"
import { MutationType } from "../models/enum"

const BlockChildrenList: React.FC<{
  blocks: Block[] | BlockDef[]
  onDelete?: (child: Block | BlockDef) => void
}> = ({ blocks, onDelete }) => {
  return (
    <div className="">
      {blocks &&
        blocks
          .filter((block) => block.__mutation_type__ !== MutationType.Delete)
          .map((block: Block | BlockDef, index: number) => {
            const blockWidth = block.type.includes("LEAF_") ? "col-4" : "col"
            const blockDisplay = block.type.includes("LEAF_")
              ? "d-inline-block"
              : "d-block"
            return (
              <div
                className={`p-2 ${blockWidth} ${blockDisplay}`}
                key={block.id}
              >
                <div className="card">
                  <DndSourceBox type="block" block={block}>
                    <BlockCatalogItem
                      block={block}
                      index={index}
                      onDelete={(child) => onDelete(child)}
                    />
                  </DndSourceBox>
                </div>
              </div>
            )
          })}
    </div>
  )
}

export { BlockChildrenList }
