import React from 'react'
import { Block } from '../context/interface'
import { DndSourceBox } from '../block/DndSourceBox'
import { BlockCatalogItem } from '../block/BlockCatalogItem'
import { DndTargetBox } from '../block/DndTargetBox'

const BlockChildrenList: React.FC<{
  blocks: Block[]
  setCatalogItem?: (block: Block) => void
}> = ({ blocks, setCatalogItem }) => {
  return (
    <div className="container-fluid row">
      {blocks &&
        blocks.map((block: Block, index: number) => {
          return (
            <div className="col-12 p-0 md-2" key={block.id}>
              <div className="card p-0">
                <DndSourceBox type="block" block={block}>
                  <BlockCatalogItem
                    block={block}
                    index={index}
                    setCatalogItem={setCatalogItem}
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