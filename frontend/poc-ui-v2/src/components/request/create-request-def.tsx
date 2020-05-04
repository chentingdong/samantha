import uuid from 'uuid'
import React, { FC, useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Context } from '../context/store'
import { ButtonGroup } from 'react-bootstrap'
import { RequestDef, BlockDef } from '../context/interface'

const CreateRequestDef = (props) => {
  const { state, dispatch } = useContext(Context)

  console.log(state.requestDefs)
  const defaultRequest: RequestDef = state.requestDefs.find(
    (rd: RequestDef) => {
      return rd.name === 'default'
    }
  )

  const { register, getValues, setValue, handleSubmit } = useForm({
    defaultValues: defaultRequest,
  })

  const onSumbit = (data) => {
    console.log(JSON.stringify(data))
  }

  const addBlockToRequest = async (index) => {
    let currentBock = Object.assign(state.blockDefs[index], {
      id: uuid.v4(),
      state: 'pending',
      requester: state.user.id,
    })

    let blocks = state.currentRequest.blocks
    blocks.push(currentBock)

    dispatch({
      type: 'saveCurrentRequest',
      currentRequest: {
        ...state.currentRequest,
        id: uuid.v4(),
        blocks: blocks,
      },
    })
  }

  const saveRequestDef = async () => {
    let currentRequest: RequestDef = Object.assign(
      state.currentRequest,
      getValues()
    )

    await dispatch({
      type: 'saveCurrentRequest',
      currentRequest: { ...state.currentRequest, id: uuid.v4() },
    })

    await dispatch({
      type: 'saveRequestDefs',
      requestDefs: [...state.requestDefs, currentRequest],
    })

    setValue('object', {})
    await dispatch({
      type: 'saveCurrentRequest',
      currentRequest: defaultRequest,
    })

    close()
  }

  const close = () => {
    dispatch({
      type: 'setUiState',
      uiState: {
        showCreateRequestDef: false,
      },
    })
  }

  return (
    <div className="row h-100">
      <main className="d-flex flex-column col-8 mr-2">
        <h2>Create Request Def</h2>
        <form onSubmit={handleSubmit(onSumbit)} className="row">
          <div className="form-group col-6">
            <label>Name: </label>
            <input className="form-control" ref={register} name="name" />
          </div>
          <div className="form-group col-6">
            <label>Request Owner: </label>
            <input className="form-control" ref={register} name="requester" />
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
            {state.currentRequest.blocks.map(
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
            <button className="btn btn-light" onClick={saveRequestDef}>
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
  )
}

export { CreateRequestDef }
