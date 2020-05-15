import uuid from 'uuid'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Context } from '../context/store'
import { ButtonGroup } from 'react-bootstrap'
import { Block } from '../context/interface'
import { initialState } from '../context/store'
import { BlockDefPalette } from '../block-old/block-def-palette'
import { DndTargetBox } from '../block-old/dnd-target-box'
import { RequestBlocks } from '../block-old/request-blocks'
import { OptionsUsers } from '../user/options-users'

export const EditRequest = () => {
  const { state, dispatch } = useContext(Context)
  const defaultRequest = initialState.currentRequest

  const { register, getValues, setValue, handleSubmit } = useForm({
    defaultValues: state.currentRequest,
  })

  const onSumbit = (data) => {
    console.log(JSON.stringify(data))
  }

  const addBlockToRequest = async (block: Block) => {
    block.id = uuid.v4()
    let updatedBlocks = [...state.currentRequest.blocks, block]
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
    let currentRequest: Block = Object.assign(
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
    setValue('object', {})
    await dispatch({
      type: 'set',
      data: { currentRequest: defaultRequest },
    })

    close()
  }

  const close = () => {
    dispatch({
      type: 'setUi',
      data: {
        showEditRequest: false,
      },
    })
    dispatch({
      type: 'set',
      data: { currentRequest: initialState.currentRequest },
    })
  }

  return (
    <div
      className="container-fluid row h-100"
      style={{ top: '0', right: '0', zIndex: 5 }}
    >
      <main className="d-flex flex-column col-8 mr-2">
        <h2>Create/Modify Request</h2>
        <form onSubmit={handleSubmit(onSumbit)} className="row">
          <div className="form-group col-6">
            <label>Name: </label>
            <input className="form-control" ref={register} name="name" />
          </div>
          <div className="form-group col-6">
            <label>Request Owner: </label>
            <select className="form-control" ref={register} name="requester">
              <OptionsUsers />
            </select>
          </div>
          <div className="form-group col-6">
            <label>Description: </label>
            <textarea
              className="form-control"
              ref={register}
              name="description"
            />
          </div>
          <div className="form-group col-6">
            <label>Responders: </label>
            <select
              className="form-control"
              ref={register}
              name="responders"
              multiple
            >
              <OptionsUsers />
            </select>
          </div>
          <div className="form-group col-12">
            <DndTargetBox
              accept="block"
              greedy={false}
              onDrop={(blockDef) => addBlockToRequest(blockDef)}
            >
              <RequestBlocks blocks={state.currentRequest.blocks} />
            </DndTargetBox>
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
        <BlockDefPalette />
      </aside>
    </div>
  )
}
