import React from 'react'
import { Context } from '../context/store'
import { BlockDef } from '../context/interface'
import { BlockDefCard } from './block-def-card'
import { DragSourceBox } from '../utils/drag-source-box'
import { DragTargetBox } from '../utils/drag-target-box'

export const BlockDefPalette = () => {
  const { state, dispatch } = React.useContext(Context)

  return (
    <div>
      <h2>Block Palette</h2>
      <small className="row">
        {state.blockDefs.map((blockDef: BlockDef, index) => {
          return (
            <div className="card p-0 m-4 col-4" key={`blockDef-${index}`}>
              <DragSourceBox blockDef={blockDef}>
                <BlockDefCard blockDef={blockDef} />
              </DragSourceBox>
            </div>
          )
        })}
      </small>
    </div>
  )
}
