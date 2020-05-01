import React, { FC, useState, useContext } from 'react'
import blockDefs from '../../../data/blockDefs.json'

const CreateRequestDef = (props) => {
  const addBlockToRequest = (e) => {
    console.log(e.target)
  }

  return (
    <div className="row h-100">
      <main className="flex-column col-8">
        <h2>Create Request Def</h2>
        <p>Request description</p>
        <p>Request Owner</p>
        {}
      </main>
      <aside className="flex-column col-4 border-left border-gray row">
        <h2>Block Palette</h2>
        <div className="row">
          {blockDefs.map((blockDef, index) => {
            return (
              <div className="card p-3 m-2 col-4 border-dark" key={index}>
                <h4>{blockDef.name}</h4>
                <p>{blockDef.description}</p>
                <button className="btn btn-light" onClick={addBlockToRequest}>
                  +
                </button>
              </div>
            )
          })}
        </div>
      </aside>
    </div>
  )
}

export { CreateRequestDef }
