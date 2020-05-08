import React from 'react'
import { Context } from '../context/store'
import { BlockDef } from '../context/interface'
import { DndSourceBox } from './dnd-source-box'

export const BlockDefPalette: React.FC<{
  blocks: BlockDef[]
}> = ({ blocks }) => {
  return (
    <div>
      <h2>Block Palette</h2>
      <small className="row">
        {blocks.map((block: BlockDef) => {
          return (
            <div className="card p-0 m-4 col-4" key={block.id}>
              <DndSourceBox type="block" blockDef={block}>
                <div className="card">
                  <strong className="card-header">{block.name}</strong>
                  <div className="card-body">{block.description}</div>{' '}
                </div>
              </DndSourceBox>
            </div>
          )
        })}
      </small>
    </div>
  )
}
