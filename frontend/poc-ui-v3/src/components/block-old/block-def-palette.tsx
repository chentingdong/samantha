import React, { useContext } from 'react'
import { Context } from '../context/store'
import { Block } from '../context/interface'
import { DndSourceBox } from '../block/DndSourceBox'

export const BlockDefPalette = () => {
  const { state, dispatch } = useContext(Context)

  return (
    <div>
      <h2>Block Palette</h2>
      <small className="row">
        {state.blockDefs?.map((block: Block) => {
          return (
            <div className="col-6 p-2" key={block.id}>
              <div className="card p-0">
                <DndSourceBox type="block" block={block}>
                  <div className="card">
                    <strong className="card-header">{block.name}</strong>
                    <div className="card-body">{block.description}</div>
                  </div>
                </DndSourceBox>
              </div>
            </div>
          )
        })}
      </small>
    </div>
  )
}
