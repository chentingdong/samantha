import uuid from "uuid"
import React, { useEffect, useCallback } from "react"
import { useForm } from "react-hook-form"
import { BlockOrDef } from "../models/interface"
import { BlockCatalogList } from "./BlockCatalogList"
import { BlockChildrenList } from "./BlockChildrenList"
import { OptionsUsers } from "./OptionsUsers"
import { transformBlockInput } from "../operations/transform"
import { EditMode, ItemOrigin, MutationType } from "../models/enum"
import { Grid, Row, Col, Nav } from "rsuite"

const BlockEditor: React.FC<{
  draftBlock: BlockOrDef
  setDraftBlock: (BlockOrDef) => void
  close: () => void
  editMode: EditMode
  itemOrigin: ItemOrigin
  actions: any
}> = ({ draftBlock, setDraftBlock, close, editMode, itemOrigin, actions }) => {
  const { register, getValues, setValue, handleSubmit } = useForm({
    defaultValues: draftBlock,
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
    // had to create a copy of children because it is not extensible
    setDraftBlock({
      ...draftBlock,
      children: [...draftBlock.children, childBlock],
    })
  }

  const deleteSubBlock = (childBlock: BlockOrDef) => {
    const index = draftBlock.children.findIndex(
      (child) => child.id === childBlock.id
    )
    if (index < 0) return
    const updatedChild = Object.assign({}, draftBlock.children[index], {
      __mutation_type__: MutationType.Delete,
    })
    const updatedChildren = [...draftBlock.children]
    updatedChildren[index] = updatedChild
    setDraftBlock({
      ...draftBlock,
      children: updatedChildren,
    })
  }

  const saveBlock = async (e) => {
    e.preventDefault()
    // apply user's form changes
    const formValues = getValues()
    const draftBlockWithFormValues = Object.assign({}, draftBlock, formValues)
    const mutationType = draftBlockWithFormValues.__mutation_type__
    const draftBlockTransformed = transformBlockInput(draftBlockWithFormValues)

    // console.log(
    //   `draftBlockTransformed:\n${JSON.stringify(draftBlockTransformed)}`
    // )
    // TODO: fix logic
    mutationType === MutationType.Create
      ? createOneBlock({ variables: { data: draftBlockTransformed } })
      : updateOneBlock({
          variables: {
            data: draftBlockTransformed,
            where: { id: draftBlockTransformed.id },
          },
        })

    close()
  }

  return (
    <Grid fluid className="bg-gray-700 p-2 m-2">
      <Row>
        <Col xs={24} md={18}>
          <h2>Request Editor</h2>
          <form onSubmit={handleSubmit(onSumbit)} className="row">
            <div className="form-group">
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
                    defaultValue={draftBlock.requestors?.map((user) => user.id)}
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
                    defaultValue={draftBlock.responders?.map((user) => user.id)}
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
                blocks={draftBlock.children}
                addSubBlock={addSubBlock}
                onDelete={(childBlock) => deleteSubBlock(childBlock)}
              />
            </div>
            <div className="d-flex justify-content-around col-12">
              <button
                className="btn btn-gray col-2"
                onClick={(e) => saveBlock(e)}
              >
                save
              </button>
              <button className="btn btn-gray col-2" onClick={close}>
                cancel
              </button>
            </div>
          </form>
        </Col>
        <Col xs={24} md={6} className="border-left border-gray">
          <BlockCatalogList />
        </Col>
      </Row>
    </Grid>
  )
}

export { BlockEditor }
