import React, { FC, useState, useContext, useEffect } from 'react'
import blockDefs from '../../../data/blockDefs.json'
import requestDefs from '../../../data/requestDefs.json'
import { Context, RequestDef, BlockDef } from '../context/store'
import { ButtonGroup } from 'react-bootstrap'
import uuid from 'uuid'

const CreateRequestDef = (props) => {
  const { state, dispatch } = useContext(Context)

  const defaultRequest: RequestDef = requestDefs.find((rd: RequestDef) => {
    return rd.name === 'default'
  })

  const [currentRequest, setCurrentRequest] = useState(defaultRequest)

  const addBlockToRequest = async (index) => {
    let blockDef = await blockDefs[index]
    await dispatch({ type: 'saveBlockDefs', blockDefs: blockDefs })

    const block: BlockDef = Object.assign({ id: uuid.v4() }, blockDef)
    block.id = uuid.v4()
    setCurrentRequest({
      ...currentRequest,
      id: uuid.v4(),
      blocks: currentRequest.blocks.concat(block),
    })
  }

  const renameCurrentRequest = (e) => {
    setCurrentRequest({
      ...currentRequest,
      name: e.target.value,
    })
  }

  const closeCreateRequest = () => {
    dispatch({
      type: 'setUiState',
      uiState: {
        showCreateRequestDef: false,
      },
    })
  }

  const saveRequestDef = () => {
    let requestDefs = state.requestDefs
    requestDefs.push(currentRequest)
    dispatch({ type: 'saveRequestDefs', requestDefs: requestDefs })
    closeCreateRequest()
  }

  return (
    <div className="row h-100">
      <main className="flex-column col-8">
        <h2>Create Request Def</h2>
        <label>name: </label>
        <input value={currentRequest.name} onChange={renameCurrentRequest} />
        <p>Request description: {currentRequest.description}</p>
        <p>Request Owner: {currentRequest.requester}</p>
        {currentRequest.blocks &&
          currentRequest.blocks.map((block: BlockDef, index) => {
            return (
              <div className="card p-0 m-4 col-4 border-dark" key={index}>
                <strong className="card-header">{block.name}</strong>
                <div className="card-body">{block.description}</div>
              </div>
            )
          })}
        <ButtonGroup>
          <button className="btn btn-light" onClick={saveRequestDef}>
            save
          </button>
          <button className="btn btn-light" onClick={closeCreateRequest}>
            cancel
          </button>
        </ButtonGroup>
      </main>
      <aside className="d-flex flex-column col-4 border-left border-gray row">
        <h2>Block Palette</h2>
        <div className="row">
          {blockDefs.map((blockDef, index) => {
            return (
              <div className="card p-0 m-4 col-4 border-dark" key={index}>
                <strong className="card-header">{blockDef.name}</strong>
                <div className="card-body">{blockDef.description}</div>
                <button
                  className="btn btn-light card-footer"
                  onClick={(e) => addBlockToRequest(index)}
                >
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
