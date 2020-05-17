import React from "react"
import { Block } from "../context/interface"
import { DndSourceBox } from "../block/DndSourceBox"
import { BlockCatalogItem } from "../block/BlockCatalogItem"
import { DndTargetBox } from "../block/DndTargetBox"

const BlockChildrenList: React.FC<{
  blocks: Block[],
}> = ({ blocks }) => {
  return (
    <div className="">
      {blocks &&
        blocks.map((block: Block, index: number) => {
          const blockWidth = block.type.includes("LEAF_") ? "w-25" : "w-100"
          const blockDisplay = block.type.includes("LEAF_")
            ? "d-inline-block"
            : "d-block"
          return (
            <div className={`p-2 ${blockWidth} ${blockDisplay}`} key={block.id}>
              <div className="card">
                <DndSourceBox type="block" block={block}>
                  <BlockCatalogItem block={block} index={index} />
                </DndSourceBox>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export { BlockChildrenList }
