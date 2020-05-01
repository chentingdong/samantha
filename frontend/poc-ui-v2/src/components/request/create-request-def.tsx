import React, { FC, useState, useContext } from 'react'
import blockDefs from '../../../data/blockDefs.json'
import { Context } from '../context/store'

const CreateRequestDef = (props) => {
  const { state, dispatch } = useContext(Context)

  return (
    <div className="row h-100">
      <main className="flex-column col-8">
        <h2>Create Request Def</h2>
        <p>Request description</p>
        <p>Request Owner</p>
      </main>
      <aside className="flex-column col-4 border-left border-gray">
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
