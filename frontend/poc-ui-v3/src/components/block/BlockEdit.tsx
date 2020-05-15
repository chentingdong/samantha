import uuid from 'uuid'
import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Context } from '../context/store'
import { ButtonGroup } from 'react-bootstrap'
import { Block } from '../context/interface'
import { BlockCatalogList } from '../blocks/BlockCatalogList'
import { DndTargetBox } from './dnd-target-box'
import { RequestBlocks } from '../block-old/request-blocks'
import { OptionsUsers } from '../user/options-users'

const BlockEdit = ({ block, close }) => {
  const { state, dispatch } = useContext(Context)
  const { register, getValues, setValue, handleSubmit } = useForm({
    defaultValues: block,
  })

  const onSumbit = (data) => {
    console.log(JSON.stringify(state))
  }

  const addSubBlock = (childBlock: Block) => {
    console.log(block)
    let updatedChildren = block.children
      ? [...block.children, childBlock]
      : [childBlock]
    let updatedBlock = {
      ...block,
      children: updatedChildren,
    }
    // mutation here
    dispatch({
      type: 'set',
      data: {
        currentRequestDef: updatedBlock,
      },
    })
    dispatch({
      type: 'set',
      data: {
        BlockDefs: state.blockDefs.slice(state.blockDefs.indexOf(block), 1),
      },
    })
  }

  const saveBlock = async () => {
    // apply user's form changes
    const formValues = getValues()
    let block = Object.assign(state.currentRequestDef, formValues)

    let requestDefs = state.requestDefs

    // if blockDef is found in blockDefs, then update, otherwise create
    // TODO: rewrite the following block with elegent codes
    let found = false
    requestDefs.forEach((rd, index) => {
      if (rd.id === block.id) {
        requestDefs[index] = block
        found = true
        return
      }
    })
    if (!found) {
      requestDefs.push(block)
    }

    // await dispatch({
    //   type: 'set',
    //   data: { requestDefs: requestDefs },
    // })

    close()
  }

  return (
    <div className="container-fluid row h-100">
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
              onDrop={(childBlock) => addSubBlock(childBlock)}
            >
              <RequestBlocks children={block.children} />
            </DndTargetBox>
          </div>
          <ButtonGroup className="d-flex justify-content-around col-12">
            <button className="btn btn-gray col-2" onClick={saveBlock}>
              save
            </button>
            <button className="btn btn-gray col-2" onClick={close}>
              cancel
            </button>
          </ButtonGroup>
        </form>
      </main>
      <aside className="d-flex flex-column col-4 border-left border-gray row">
        <BlockCatalogList />
      </aside>
    </div>
  )
}

export { BlockEdit }
