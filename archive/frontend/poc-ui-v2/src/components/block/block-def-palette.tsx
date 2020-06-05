import React, { useContext } from 'react'
import { Context } from '../context/store'
import { BlockDef } from '../context/interface'
import { DndSourceBox } from './dnd-source-box'

export const BlockDefPalette = () => {
  const { state, dispatch } = useContext(Context)

  return (
    <div>
      <h2>Block Palette</h2>
      <small className="row">
        {state.blockDefs?.map((block: BlockDef) => {
          return (
            <div className="card p-0 m-4 col-4" key={block.id}>
              <DndSourceBox type="block" blockDef={block}>
                <div className="card">
                  <strong className="card-header">{block.name}</strong>
                  <div className="card-body">{block.description}</div>
                </div>
              </DndSourceBox>
            </div>
          )
        })}
      </small>
    </div>
  )
}
