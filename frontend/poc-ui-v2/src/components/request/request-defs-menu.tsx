import * as React from 'react'
import requestDefs from '../../../data/requestDefs.json'
import { useState } from 'react'
import { CreateRequestDef } from './create-request-def'
import { Context } from '../context/store'

function RequestDefsMenu() {
  // TODO: context ui component
  // const [showCreateRequestDef, setShowCreateRequestDef] = useState(false)
  const { state, dispatch } = React.useContext(Context)

  const toggleCreateRequestDef = () => {
    dispatch({
      type: 'setUiState',
      uiState: {
        showCreateRequestDef: !state.uiState.showCreateRequestDef,
      },
    })
  }

  return (
    <div className="">
      <div className="d-flex justify-content-between">
        <h2 className="col-4">Request Defs Menu</h2>
        <div
          id="toggleCreateRequestDef"
          className="btn btn-link col-2 text-right"
          style={{ zIndex: 100 }}
          onClick={toggleCreateRequestDef}
        >
          {state.uiState.showCreateRequestDef ? (
            <span>Return to menu</span>
          ) : (
            <span>Add Request to Menu</span>
          )}
        </div>
      </div>
      {state.uiState.showCreateRequestDef && (
        <div
          id="createRequestDef"
          className="col-12 position-absolute bg-light vh-75"
          style={{ top: '0', zIndex: 5 }}
        >
          <CreateRequestDef />
        </div>
      )}
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
