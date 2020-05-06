import uuid from 'uuid'
import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Context } from '../context/store'
import { ButtonGroup } from 'react-bootstrap'
import { RequestDef, BlockDef } from '../context/interface'
import { initialState } from '../context/store'

export const EditRequest = (props) => {
  const { state, dispatch } = useContext(Context)
  const prevRequest = state.currentRequest
  const defaultRequest = initialState.currentRequest

  const { register, getValues, setValue, handleSubmit } = useForm({
    defaultValues: prevRequest,
  })

  const onSumbit = (data) => {
    console.log(JSON.stringify(data))
  }

  const addBlockToRequest = async (index) => {
    let currentBlock = state.blockDefs[index]
    let updatedBlocks = [...state.currentRequest.blocks, currentBlock]
    let updatedRequest = {
      ...state.currentRequest,
      blocks: updatedBlocks,
    }
    dispatch({
      type: 'set',
      data: { currentRequest: updatedRequest },
    })
  }

  const saveRequest = async () => {
    // apply form changes
    const formValues = getValues()
    let currentRequest: RequestDef = Object.assign(
      state.currentRequest,
      formValues
    )

    // add/modify currentRequest in requests, if found update, otherwise create
    let requests = state.requests
    let found = false
    requests.forEach((rd, index) => {
      if (rd.id === currentRequest.id) {
        requests[index] = currentRequest
        found = true
        return
      }
    })
    if (!found) {
      requests.push(currentRequest)
    }

    await dispatch({
      type: 'set',
      data: { requests: requests },
    })

    // reset after finish
    await dispatch({
      type: 'set',
      data: { currentRequest: defaultRequest },
    })

    setValue('object', {})
    close()
  }

  const close = () => {
    dispatch({
      type: 'setUi',
      data: {
        showEditRequest: false,
        currentRequest: defaultRequest,
      },
    })
  }

  return (
    state.uiState.showEditRequest && (
      <div
        className="col-10 position-absolute bg-light vh-100"
        style={{ top: '0', right: '0', zIndex: 5 }}
      >
        <div className="row h-100">
          <main className="d-flex flex-column col-8 mr-2">
            <h2>Create Request</h2>
            <form onSubmit={handleSubmit(onSumbit)} className="row">
              <div className="form-group col-6">
                <label>Name: </label>
                <input className="form-control" ref={register} name="name" />
              </div>
              <div className="form-group col-6">
                <label>Request Owner: </label>
                <input
                  className="form-control"
                  ref={register}
                  name="requester"
                />
              </div>
              <div className="form-group col-12">
                <label>Description: </label>
                <textarea
                  className="form-control"
                  ref={register}
                  name="description"
                />
              </div>
              <div className="form-group col-12">
                {state.currentRequest.blocks?.map(
                  (block: BlockDef, index: number) => {
                    return (
                      <div
                        className="card p-0 m-4 col-4 border-dark"
                        key={`block-${index}`}
                      >
                        <strong className="card-header">{block.name}</strong>
                        <div className="card-body">{block.description}</div>
                      </div>
                    )
                  }
                )}
              </div>
              <ButtonGroup className="col-12">
                <button className="btn btn-light" onClick={saveRequest}>
                  save
                </button>
                <button className="btn btn-light" onClick={close}>
                  cancel
                </button>
              </ButtonGroup>
            </form>
          </main>
          <aside className="d-flex flex-column col-4 border-left border-gray row">
            <h2>Block Palette</h2>
            <div className="row">
              {state.blockDefs.map((blockDef: BlockDef, index) => {
                return (
                  <div
                    className="card p-0 m-4 col-4 border-dark"
                    key={`blockDef-${index}`}
                  >
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
      </div>
    )
  )
}
