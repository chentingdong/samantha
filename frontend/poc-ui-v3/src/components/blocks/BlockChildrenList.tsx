import React from "react"
import { Block } from "../context/interface"
import { DndSourceBox } from "../block/DndSourceBox"
import { BlockCatalogItem } from "../block/BlockCatalogItem"
import { DndTargetBox } from "../block/DndTargetBox"
import { MutationType } from "../context/enum"

const BlockChildrenList: React.FC<{
  blocks: Block[],
  onDelete?: (child: Block) => void,
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
