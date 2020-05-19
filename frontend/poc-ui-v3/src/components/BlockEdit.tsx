import uuid from 'uuid'
import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Context } from '../context/store'
import { ButtonGroup } from 'react-bootstrap'
import { Block } from '../context/interface'
import { DndTargetBox } from './DndTargetBox'
import { BlockCatalogList } from '../containers/BlockCatalogList'
import { BlockChildrenList } from '../containers/BlockChildrenList'
import { OptionsUsers } from './OptionsUsers'
import { transformBlockInput } from '../operations/transform'
import { CREATE_ONE_BLOCK } from '../operations/mutations/createOneBlock'
import { UPDATE_ONE_BLOCK } from '../operations/mutations/updateOneBlock'
import { useMutation } from '@apollo/client'
import { EditMode, ItemOrigin, MutationType } from "../context/enum"

const BlockEdit: React.FC<{
  blockCreateInput: Block
  close: () => void
  editMode: EditMode
  itemOrigin: ItemOrigin
}> = ({ blockCreateInput: blockCreateInput, close, editMode, itemOrigin }) => {
  const { state, dispatch } = useContext(Context)
  const { register, getValues, setValue, handleSubmit } = useForm({
    defaultValues: blockCreateInput,
  })
  const [ createOneBlock ] = useMutation(CREATE_ONE_BLOCK)
  const [ updateOneBlock ] = useMutation(UPDATE_ONE_BLOCK)

  const escFunction = useCallback((event) => {
    if(event.keyCode === 27) {
      // Do whatever when esc is pressed
      close()
    }
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    }
  }, [])

  const onSumbit = () => {
    // what action to take on submit?
  }

  const addSubBlock = (childBlock: Block) => {
    const updatedChildren = blockCreateInput.children
      ? [...blockCreateInput.children, childBlock]
      : [childBlock]
    const updatedBlock = {
      ...blockCreateInput,
      children: updatedChildren,
    }
    blockCreateInput = updatedBlock
    dispatch({ type: 'set', data: { blockCreateInput} })
  }

  const deleteSubBlock = (childBlock: Block) => {
    const index = blockCreateInput.children.findIndex((child) => child.id === childBlock.id)
    if (index < 0) return
    const updatedChildren = [...blockCreateInput.children]
    updatedChildren[index] = Object.assign({}, updatedChildren[index], { __mutation_type__: MutationType.Delete })
    const updatedBlock = {
      ...blockCreateInput,
      children: updatedChildren,
    }
    blockCreateInput = updatedBlock
    dispatch({ type: 'set', data: { blockCreateInput} })
  }

  const saveBlock = async () => {
    // apply user's form changes
    const formValues = getValues()
    const blockCreateInputWithFormValues = Object.assign({}, state.blockCreateInput, formValues)
    const mutationType = blockCreateInputWithFormValues.__mutation_type__
    const blockCreateInputTransformed = transformBlockInput(blockCreateInputWithFormValues)

    // console.log(`blockCreateInputTransformed:\n${JSON.stringify(blockCreateInputTransformed)}`)
    // TODO: fix logic
    mutationType===MutationType.Create ?
      createOneBlock({ variables: { data: blockCreateInputTransformed } }) :
      updateOneBlock({ variables: { data: blockCreateInputTransformed, where: { id: blockCreateInputTransformed.id }}})

    close()
  }

  return (
    <div className="container-fluid row">
      <main className="d-flex flex-column col mr-2">
        <h2>Create/Modify Request Def</h2>
        <form onSubmit={handleSubmit(onSumbit)} className="row">
          <div className="form-group col">
            <label>Name: </label>
            <input className="form-control" ref={register} name="name" />
          </div>
          {(editMode === EditMode.Edit && itemOrigin === ItemOrigin.Catalog) ?
            <></> : (
              <>
                <div className="form-group col-3">
                  <label>Requestors: </label>
                  <select className="form-control" ref={register} name="requestors" defaultValue={blockCreateInput.requestors.map((user)=>user.id)} multiple >
                    <OptionsUsers />
                  </select>
                </div>
                <div className="form-group col-3">
                  <label>Responders: </label>
                  <select className="form-control" ref={register} name="responders" defaultValue={blockCreateInput.responders.map((user)=>user.id)} multiple>
                    <OptionsUsers />
                  </select>
                </div>
              </>
            )
          }
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
              <BlockChildrenList
                blocks={blockCreateInput.children}
                onDelete={(childBlock)=>deleteSubBlock(childBlock)}
              />
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
