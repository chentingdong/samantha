import React from 'react'
import { Context } from '../context/store'
import { BlockDef } from '../context/interface'
import { DndSourceBox } from './dnd-source-box'

export const BlockDefPalette = () => {
  const { state, dispatch } = React.useContext(Context)

  return (
    <div>
      <h2>Block Palette</h2>
      <small className="row">
        {state.blockDefs.map((blockDef: BlockDef, index) => {
          return (
            <div className="card p-0 m-4 col-4" key={`blockDef-${index}`}>
              <DndSourceBox type="block" blockDef={blockDef}>
                <div className="card">
                  <strong className="card-header">{blockDef.name}</strong>
                  <div className="card-body">{blockDef.description}</div>{' '}
                </div>
              </DndSourceBox>
            </div>
          )
        })}
      </small>
    </div>
  )
}
