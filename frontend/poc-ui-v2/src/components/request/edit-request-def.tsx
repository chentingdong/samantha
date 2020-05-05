import uuid from 'uuid'
import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Context } from '../context/store'
import { ButtonGroup } from 'react-bootstrap'
import { RequestDef, BlockDef } from '../context/interface'
import { initialState } from '../context/store'

const EditRequestDef: React.FC = (props) => {
  const { state, dispatch } = useContext(Context)
  const defaultRequestDef = initialState.currentRequestDef
  const prevRequestDef = state.currentRequestDef

  const { register, getValues, setValue, handleSubmit } = useForm({
    defaultValues: prevRequestDef,
  })

  const onSumbit = (data) => {
    console.log(JSON.stringify(data))
  }

  const addBlockToRequestDef = async (index) => {
    let currentBlockDef = state.blockDefs[index]
    let updatedBlocks = [...state.currentRequestDef.blocks, currentBlockDef]
    let updatedRequestDef = {
      ...state.currentRequestDef,
      blocks: updatedBlocks,
    }
    dispatch({
      type: 'set',
      data: { currentRequestDef: updatedRequestDef },
    })
  }

  const saveRequestDef = async () => {
    // apply form changes
    const formValues = getValues()
    let currentRequestDef: RequestDef = Object.assign(
      state.currentRequestDef,
      formValues
    )

    let requestDefs = state.requestDefs

    // add/modify currentRequestDef in requestDefs, if found update, otherwise create
    let found = false
    requestDefs.forEach((rd, index) => {
      if (rd.id === currentRequestDef.id) {
        requestDefs[index] = currentRequestDef
        found = true
        return
      }
    })
    if (!found) {
      requestDefs.push(currentRequestDef)
    }

    await dispatch({
      type: 'set',
      data: { requestDefs: requestDefs },
    })

    // reset after finish
    await dispatch({
      type: 'set',
      data: { currentRequestDef: defaultRequestDef },
    })

    setValue('object', {})
    close()
  }

  const close = () => {
    dispatch({
      type: 'setUi',
      data: { showEditRequestDef: false },
    })
    dispatch({
      type: 'set',
      data: { currentRequestDef: defaultRequestDef },
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
            {state.currentRequestDef.blocks.map(
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
                  onClick={(e) => addBlockToRequestDef(index)}
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

export { EditRequestDef }
