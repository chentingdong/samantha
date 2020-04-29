import * as React from 'react'
import requestDefs from '../../../data/requestDefs.json'

function RequestDefsMenu() {
  return (
    <div className="vh-100">
      <a href="#" className="float-right">
        Add Request to Menu
      </a>
      <h1 className="mt-4 mb-4">Request Menu</h1>
      {requestDefs.map((requestDef, index) => {
        return (
          <div key={`request-${index}`} className="card mt-2 p-2">
            <h4>{requestDef.name}</h4>
            <p>{requestDef.description}</p>
            <p>{requestDef.requester}</p>
          </div>
        )
      })}
    </div>
  )
}

export { RequestDefsMenu }
