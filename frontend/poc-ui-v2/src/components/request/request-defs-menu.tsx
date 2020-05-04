import * as React from 'react'
import uuid from 'uuid'
import { EditRequestDef } from './edit-request-def'
import { Context } from '../context/store'
import { RequestDef } from '../context/interface'
import initialState from '../../../data/initialState.json'

function RequestDefsMenu() {
  const { state, dispatch } = React.useContext(Context)
  const defaultRequest: RequestDef = initialState.currentRequest

  const createRequestDef = () => {
    let currentRequest = defaultRequest
    currentRequest.id = uuid.v4()
    currentRequest.requester = state.user.id

    dispatch({
      type: 'setUiState',
      uiState: {
        showEditRequestDef: !state.uiState.showEditRequestDef,
      },
    })
  }

  const editRequestDef = (index: number) => {
    let currentRequest = state.requestDefs[index]
    currentRequest.requester = state.user.id
    dispatch({ type: 'saveCurrentRequest', currentRequest: currentRequest })
    dispatch({
      type: 'setUiState',
      uiState: {
        showEditRequestDef: true,
      },
    })
  }

  const makeRequest = () => {}

  return (
    <div className="">
      <div className="d-flex justify-content-between">
        <h2 className="col-4">Request Defs Menu</h2>
        <div
          className="btn btn-link col-3 text-right"
          style={{ zIndex: 100 }}
          onClick={createRequestDef}
        >
          {state.uiState['showEditRequestDef'] ? (
            <span>Return to menu</span>
          ) : (
            <span>Add Request to Menu</span>
          )}
        </div>
      </div>
      {state.uiState['showEditRequestDef'] && (
        <div
          id="createRequestDef"
          className="col-12 position-absolute bg-light vh-100"
          style={{ top: '0', zIndex: 5 }}
        >
          <EditRequestDef />
        </div>
      )}
      <div className="container-fluid">
        {state.requestDefs &&
          state.requestDefs.map((requestDef, index) => {
            return (
              <div key={`request-${index}`} className="card mt-2 pt-2">
                <div className="d-flex justify-content-between">
                  <div className="col-7">
                    <h4>{requestDef.name}</h4>
                    <p>{requestDef.description}</p>
                    <p>Owner: {requestDef.requester}</p>
                    <p>
                      {requestDef.blocks &&
                        requestDef.blocks.map((block, index2) => {
                          return (
                            <span key={`block-${index2}`}>{block.name}</span>
                          )
                        })}
                    </p>
                  </div>
                  <div className="col-3">
                    <button className="btn btn-link" onClick={makeRequest}>
                      Make a request
                    </button>
                    <br />
                    {requestDef.name !== 'default' && (
                      <button
                        className="btn btn-link"
                        onClick={(e) => editRequestDef(index)}
                      >
                        View/Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export { RequestDefsMenu }
