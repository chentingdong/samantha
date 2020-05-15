import React from 'react'
import uuid from 'uuid'
import { Context } from '../context/store'
import { Block } from '../context/interface'
import { initialState } from '../context/store'

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
  const editRequestDef = (requestDef: Block) => {
    let currentRequestDef = requestDef
    dispatch({
      type: 'set',
      data: { currentRequestDef: currentRequestDef },
    })
    dispatch({
      type: 'setUi',
      data: { showfRequestDef: true },
    })
  }

  const makeRequest = (requestDef: Block) => {
    let currentRequest: Block = Object.assign({}, requestDef, {
      name: '',
      requestors: [
        {
          id: state.user.id,
          name: state.user.attributes.name,
          email: state.user.attributes.email,
        },
      ],
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
          state.requestDefs.map((requestDef) => {
            return (
              <div key={requestDef.id} className="card mt-2 pt-2">
                <div className="d-flex justify-content-between">
                  <div className="col-7">
                    <h4>{requestDef.name}</h4>
                    <p>{requestDef.description}</p>
                    <p>Owner: {requestDef.requestors[0]?.name}</p>
                    <p>
                      {requestDef.children &&
                        requestDef.children?.map((block) => {
                          return (
                            <span className="border p-2 mr-2" key={block.id}>
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
