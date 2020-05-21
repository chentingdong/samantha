import uuid from "uuid"
import React, { useEffect, useCallback } from "react"
import { useForm } from "react-hook-form"
import { ButtonGroup } from "react-bootstrap"
import { BlockOrDef } from "../models/interface"
import { BlockCatalogList } from "./BlockCatalogList"
import { BlockChildrenList } from "./BlockChildrenList"
import { OptionsUsers } from "./OptionsUsers"
import { transformBlockInput } from "../operations/transform"
import { EditMode, ItemOrigin, MutationType } from "../models/enum"

const BlockEditor: React.FC<{
  blockCreateInput: BlockOrDef
  setBlockCreateInput: (BlockOrDef) => void
  close: () => void
  editMode: EditMode
  itemOrigin: ItemOrigin
  actions: any
}> = ({
  blockCreateInput,
  setBlockCreateInput,
  close,
  editMode,
  itemOrigin,
  actions,
}) => {
  const { register, getValues, setValue, handleSubmit } = useForm({
    defaultValues: blockCreateInput,
  })
  const { createOneBlock, updateOneBlock } = actions

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      // Do whatever when esc is pressed
      close()
    }
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false)
    return () => {
      document.removeEventListener("keydown", escFunction, false)
    }
  }, [])

  const onSumbit = () => {
    // what action to take on submit?
  }

  const addSubBlock = (childBlock: BlockOrDef) => {
    const updatedChildren = blockCreateInput.children
      ? [...blockCreateInput.children, childBlock]
      : [childBlock]
    const updatedBlock = {
      ...blockCreateInput,
      children: updatedChildren,
    }
    blockCreateInput = updatedBlock
    setBlockCreateInput(blockCreateInput)
  }

  const deleteSubBlock = (childBlock: BlockOrDef) => {
    const index = blockCreateInput.children.findIndex(
      (child) => child.id === childBlock.id
    )
    if (index < 0) return
    const updatedChildren = [...blockCreateInput.children]
    updatedChildren[index] = Object.assign({}, updatedChildren[index], {
      __mutation_type__: MutationType.Delete,
    })
    const updatedBlock = {
      ...blockCreateInput,
      children: updatedChildren,
    }
    blockCreateInput = updatedBlock
    setBlockCreateInput(blockCreateInput)
  }

  const saveBlock = async () => {
    // apply user's form changes
    const formValues = getValues()
    const blockCreateInputWithFormValues = Object.assign(
      {},
      blockCreateInput,
      formValues
    )
    const mutationType = blockCreateInputWithFormValues.__mutation_type__
    const blockCreateInputTransformed = transformBlockInput(
      blockCreateInputWithFormValues
    )

    // console.log(
    //   `blockCreateInputTransformed:\n${JSON.stringify(
    //     blockCreateInputTransformed
    //   )}`
    // )
    // TODO: fix logic
    mutationType === MutationType.Create
      ? createOneBlock({ variables: { data: blockCreateInputTransformed } })
      : updateOneBlock({
          variables: {
            data: blockCreateInputTransformed,
            where: { id: blockCreateInputTransformed.id },
          },
        })

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
          {editMode === EditMode.Edit && itemOrigin === ItemOrigin.Catalog ? (
            <></>
          ) : (
            <>
              <div className="form-group col-3">
                <label>Requestors: </label>
                <select
                  className="form-control"
                  ref={register}
                  name="requestors"
                  defaultValue={blockCreateInput.requestors?.map(
                    (user) => user.id
                  )}
                  multiple
                >
                  <OptionsUsers />
                </select>
              </div>
              <div className="form-group col-3">
                <label>Responders: </label>
                <select
                  className="form-control"
                  ref={register}
                  name="responders"
                  defaultValue={blockCreateInput.responders?.map(
                    (user) => user.id
                  )}
                  multiple
                >
                  <OptionsUsers />
                </select>
              </div>
            </>
          )}
          <div className="form-group col-12">
            <label>Description: </label>
            <textarea
              className="form-control"
              ref={register}
              name="description"
            />
          </div>
          <div className="form-group col-12 ">
            <BlockChildrenList
              blocks={blockCreateInput.children}
              addSubBlock={addSubBlock}
              onDelete={(childBlock) => deleteSubBlock(childBlock)}
            />
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

export { BlockEditor }
