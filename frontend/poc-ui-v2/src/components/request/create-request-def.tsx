import React, { FC } from 'react'
import blockDefs from '../../../data/blockDefs.json'

/**
 * @author
 * @function CreateRequestDef
 **/

const CreateRequestDef = (props) => {
  return (
    <div className="row">
      <main className="col-10">
        <h2>CreateRequestDef</h2>
        <p>Request description</p>
        <p>Request Owner</p>
      </main>
      <aside className="col-2">
        <h2>Block Palette</h2>
        {blockDefs.map((blockDef) => {
          return (
            <>
              <h5>{blockDef.name}</h5>
            </>
          )
        })}
      </aside>
    </div>
  )
}

export { CreateRequestDef }
