import React from 'react'
import { Block } from '../context/interface'
import { DndSourceBox } from '../block/dnd-source-box'
import { BlockCard } from '../block/BlockCard'

export const BlockChildrenList = ({ blocks }) => {
  return (
    <div className="container-fluid row">
      {blocks &&
        blocks.map((block: Block, index: number) => {
          return (
            <div className="col-12 p-0 md-2" key={block.id}>
              <div className="card p-0">
                <DndSourceBox type="block" block={block}>
                  <BlockCard block={block} index={index} />
                </DndSourceBox>
              </div>
            </div>
          )
        })}
    </div>
  )
}
