import * as React from 'react'
import { Context } from '../context/store'
import { BlockDef } from '../context/interface'

export const BlockDefPalette = ({ addBlockToRequestDef }) => {
  const { state, dispatch } = React.useContext(Context)

  return (
    <div>
      <h2>Block Palette</h2>
      <div className="row">
        {state.blockDefs.map((blockDef: BlockDef, index) => {
          return (
            <div
              className="card p-0 m-4 col-4 border-dark"
              key={`blockDef-${index}`}
            >
              <strong className="card-header">{blockDef.name}</strong>
              <div className="card-body">{blockDef.description}</div>
              <button
                className="btn btn-light card-footer"
                draggable
                onClick={(e) => addBlockToRequestDef(index)}
              >
                +
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
