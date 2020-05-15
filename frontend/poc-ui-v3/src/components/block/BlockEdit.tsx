import uuid from 'uuid'
import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Context } from '../context/store'
import { ButtonGroup } from 'react-bootstrap'
import { Block } from '../context/interface'
import { DndTargetBox } from './DndTargetBox'
import { BlockCatalogList } from '../blocks/BlockCatalogList'
import { BlockChildrenList } from '../blocks/BlockChildrenList'
import { OptionsUsers } from '../user/options-users'
import { transformBlockInput } from '../../operations/transform'
import { CREATE_ONE_BLOCK } from '../../operations/mutations/createOneBlock'
import { UPDATE_ONE_BLOCK } from '../../operations/mutations/updateOneBlock'
import { useMutation } from '@apollo/client'

const BlockEdit: React.FC<{
  block: Block
  close: () => void
}> = ({ block, close }) => {
  const { state, dispatch } = useContext(Context)
  const { register, getValues, setValue, handleSubmit } = useForm({
    defaultValues: block,
  })
  const [ createOneBlock ] = useMutation(CREATE_ONE_BLOCK)
  const [ updateOneBlock ] = useMutation(UPDATE_ONE_BLOCK)

  const onSumbit = (data) => {}

  const addSubBlock = (childBlock: Block) => {
    let updatedChildren = block.children
      ? [...block.children, childBlock]
      : [childBlock]
    let updatedBlock = {
      ...block,
      children: updatedChildren,
    }
    block = updatedBlock
    dispatch({ type: 'set', data: { blockCreateInput: block} })
  }

  const saveBlock = async () => {
    // apply user's form changes
    const formValues = getValues()
    const blockCreateInput = Object.assign({}, state.blockCreateInput, formValues)
    const mutation_type = blockCreateInput.__mutation_type__
    const blockCreateInputTransformed = transformBlockInput(blockCreateInput)

    console.log(`blockCreateInputTransformed:\n${JSON.stringify(blockCreateInputTransformed)}`)
    mutation_type==='CREATE' ?
      createOneBlock({ variables: { data: blockCreateInputTransformed } }) :
      updateOneBlock({ variables: { data: blockCreateInputTransformed, where: { id: blockCreateInputTransformed.id }}})

    close()
  }

  return (
    <div className="container-fluid row">
      <main className="d-flex flex-column col-8 mr-2">
        <h2>Create/Modify Request Def</h2>
        <form onSubmit={handleSubmit(onSumbit)} className="row">
          <div className="form-group col-6">
            <label>Name: </label>
            <input className="form-control" ref={register} name="name" />
          </div>
          <div className="form-group col-3">
            <label>Requestors: </label>
            <select className="form-control" ref={ register } name="requestors" multiple>
              <OptionsUsers />
            </select>
          </div>
          <div className="form-group col-3">
            <label>Responders: </label>
            <select className="form-control" ref={register} name="responders" multiple>
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
              <BlockChildrenList
                blocks={block.children}
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
