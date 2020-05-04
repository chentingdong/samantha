import * as React from 'react'
import { CreateRequestDef } from './create-request-def'
import { Context } from '../context/store'

function RequestDefsMenu() {
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
          {state.uiState['showCreateRequestDef'] ? (
            <span>Return to menu</span>
          ) : (
            <span>Add Request to Menu</span>
          )}
        </div>
      </div>
      {state.uiState['showCreateRequestDef'] && (
        <div
          id="createRequestDef"
          className="col-12 position-absolute bg-light vh-100"
          style={{ top: '0', zIndex: 5 }}
        >
          <CreateRequestDef />
        </div>
      )}
      {state.requestDefs &&
        state.requestDefs.map((requestDef, index) => {
          return (
            <div key={`request-${index}`} className="card mt-2 p-2">
              <h4>{requestDef.name}</h4>
              <p>{requestDef.description}</p>
              <p>{requestDef.requester}</p>
              <p>
                {requestDef.blocks &&
                  requestDef.blocks.map((block, index2) => {
                    return <span key={`block-${index2}`}>{block.name}</span>
                  })}
              </p>
            </div>
          )
        })}
    </div>
  )
}

export { RequestDefsMenu }
