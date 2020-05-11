import * as React from 'react'
import uuid from 'uuid'
import { EditRequestDef } from './edit-request-def'
import { Context } from '../context/store'
import { RequestDef } from '../context/interface'
import { initialState } from '../context/store'
import { EditRequest } from './edit-request'

function RequestDefsMenu() {
  const { state, dispatch } = React.useContext(Context)

  const createRequestDef = () => {
    let currentRequestDef = initialState.currentRequestDef
    currentRequestDef.id = uuid.v4()

    dispatch({
      type: 'setUi',
      data: { showEditRequestDef: true },
    })
  }

  const returnToMenu = () => {
    dispatch({
      type: 'set',
      data: { currentRequestDef: initialState.currentRequestDef },
    })
    dispatch({
      type: 'setUi',
      data: {
        showEditRequestDef: false,
        showEditRequest: false,
      },
    })
  }
  const editRequestDef = (requestDef: RequestDef) => {
    let currentRequestDef = requestDef
    dispatch({
      type: 'set',
      data: { currentRequestDef: currentRequestDef },
    })
    dispatch({
      type: 'setUi',
      data: { showEditRequestDef: true },
    })
  }

  const makeRequest = (requestDef: RequestDef) => {
    let currentRequest: RequestDef = Object.assign({}, requestDef, {
      id: uuid.v4(),
      name: '',
      requester: state.user.id,
    })
    dispatch({
      type: 'set',
      data: { currentRequest: currentRequest },
    })
    dispatch({
      type: 'setUi',
      data: { showEditRequest: true },
    })
  }

  return (
    <div className="">
      <div className="d-flex justify-content-between">
        <h2 className="col-4">Request Defs Menu</h2>
        <div className="btn btn-link col-3 text-right" style={{ zIndex: 100 }}>
          {state.uiState.showEditRequestDef || state.uiState.showEditRequest ? (
            <span onClick={returnToMenu}>Return to menu</span>
          ) : (
            <span onClick={createRequestDef}>Add Request to Menu</span>
          )}
        </div>
      </div>
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
                        requestDef.blocks?.map((block, index2) => {
                          return (
                            <span
                              className="border p-2 mr-2"
                              key={`block-${index2}`}
                            >
                              {block.name}
                            </span>
                          )
                        })}
                    </p>
                  </div>
                  <div className="col-3">
                    <button
                      className="btn btn-link"
                      onClick={(e) => makeRequest(requestDef)}
                    >
                      Make a request
                    </button>
                    <br />
                    <button
                      className="btn btn-link"
                      onClick={(e) => editRequestDef(requestDef)}
                    >
                      View/Edit
                    </button>
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
