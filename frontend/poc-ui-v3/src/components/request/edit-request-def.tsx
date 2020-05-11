import uuid from 'uuid'
import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Context } from '../context/store'
import { ButtonGroup } from 'react-bootstrap'
import { RequestDef, BlockDef } from '../context/interface'
import { initialState } from '../context/store'
import { BlockDefPalette } from '../block/block-def-palette'
import { DndTargetBox } from '../block/dnd-target-box'
import { RequestBlocks } from '../block/request-blocks'
import { OptionsUsers } from '../user/options-users'

const EditRequestDef = (props) => {
  const { state, dispatch } = useContext(Context)
  const defaultRequestDef = initialState.currentRequestDef

  const { register, getValues, setValue, handleSubmit } = useForm({
    defaultValues: state.currentRequestDef,
  })

  const onSumbit = (data) => {
    console.log(JSON.stringify(data))
  }

  const addBlockToRequestDef = async (blockDef: BlockDef) => {
    // let currentBlockDef = state.blockDefs.find((bd) => bd.id === blockDef.id)
    let currentBlockDef = blockDef
    dispatch({
      type: 'set',
      data: {
        currentBlockDef: currentBlockDef,
      },
    })
    let updatedBlocks = [...state.currentRequestDef.blocks, currentBlockDef]
    let updatedRequestDef = {
      ...state.currentRequestDef,
      blocks: updatedBlocks,
    }
    let prevBlockDef = currentBlockDef
    dispatch({
      type: 'set',
      data: {
        currentRequestDef: updatedRequestDef,
      },
    })
    dispatch({
      type: 'set',
      data: {
        BlockDefs: state.blockDefs.slice(
          state.blockDefs.indexOf(currentBlockDef),
          1
        ),
      },
    })
  }

  const saveRequestDef = async () => {
    // apply user's form changes
    const formValues = getValues()
    let currentRequestDef: RequestDef = Object.assign(
      state.currentRequestDef,
      formValues
    )

    let requestDefs = state.requestDefs

    // if blockDef is found in blockDefs, then update, otherwise create
    // TODO: rewrite the following block with elegent codes
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

    close()
  }

  const close = () => {
    dispatch({
      type: 'set',
      data: { currentRequestDef: defaultRequestDef },
    })
    dispatch({
      type: 'setUi',
      data: { showEditRequestDef: false },
    })
  }

  return (
    <div className="row h-100">
      <main className="d-flex flex-column col-8 mr-2">
        <h2>Create/Modify Request Def</h2>
        <form onSubmit={handleSubmit(onSumbit)} className="row">
          <div className="form-group col-6">
            <label>Name: </label>
            <input className="form-control" ref={register} name="name" />
          </div>
          <div className="form-group col-6">
            <label>Requester: </label>
            <select className="form-control" ref={register} name="requester">
              <OptionsUsers />
            </select>
          </div>
          <div className="form-group col-12">
            <label>Description: </label>
            <textarea
              className="form-control"
              ref={register}
              name="description"
            />
          </div>
          <div className="form-group col-12 ">
            <DndTargetBox
              accept="block"
              greedy={false}
              onDrop={(blockDef) => addBlockToRequestDef(blockDef)}
            >
              <RequestBlocks blocks={state.currentRequestDef.blocks} />
            </DndTargetBox>
          </div>
          <ButtonGroup className="d-flex justify-content-around col-12">
            <button className="btn btn-gray col-2" onClick={saveRequestDef}>
              save
            </button>
            <button className="btn btn-gray col-2" onClick={close}>
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

export { EditRequestDef }
