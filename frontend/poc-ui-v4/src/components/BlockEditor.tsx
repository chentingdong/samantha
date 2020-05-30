import uuid from "uuid"
import React, { useReducer, useEffect, useCallback } from "react"
import { BlockOrDef } from "../models/interface"
import { BlockCatalogList } from "./BlockCatalogList"
import { BlockChildrenList } from "./BlockChildrenList"
import { transformBlockInput } from "../operations/transform"
import { EditMode, ItemOrigin, MutationType } from "../models/enum"
import { Grid, Row, Col, Nav, TagPicker } from "rsuite"
import { Form, FormGroup, FormControl, ControlLabel } from "rsuite"
import { Button } from "./Button"
import styled from "styled-components"
import tw from "tailwind.macro"
import { useQuery } from "@apollo/client"
import { GET_USERS } from "../operations/queries/getUsers"

type BlockEditorType = {
  draftBlock: BlockOrDef
  setDraftBlock: (BlockOrDef) => void
  close: () => void
  editMode: EditMode
  itemOrigin: ItemOrigin
  actions: any
  className?: string
}
const BlockEditorRaw: React.FC<BlockEditorType> = ({
  draftBlock,
  setDraftBlock,
  close,
  editMode,
  itemOrigin,
  actions,
  className = "",
}) => {
  const reducer = (state, action) => {
    const newState = { ...state }
    newState[action.field] = action.value
    return newState
  }

  const blockInit = (block) => {
    const newBlock = {
      ...block,
      requestors: block.requestors?.map((user) => user.id),
      responders: block.responders?.map((user) => user.id),
    }
    return newBlock
  }

  const [state, dispatch] = useReducer(reducer, blockInit(draftBlock))

  const { createOneBlock, updateOneBlock } = actions
  const { data } = useQuery(GET_USERS)
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
    const updatedChild = {
      ...draftBlock.children[index],
      __mutation_type__: MutationType.Delete,
    }
    const updatedChildren = [...draftBlock.children]
    updatedChildren[index] = updatedChild
    setDraftBlock({
      ...draftBlock,
      children: updatedChildren,
    })
  }

  const saveBlock = async (e) => {
    e.preventDefault()
    const draftBlockWithFormValues = { ...draftBlock, ...state }
    const mutationType = draftBlockWithFormValues.__mutation_type__

    // TODO: fix logic
    mutationType === MutationType.Create
      ? createOneBlock({
          variables: { data: transformBlockInput(draftBlockWithFormValues) },
        })
      : updateOneBlock({
          variables: {
            data: draftBlockWithFormValues,
            where: { id: draftBlockWithFormValues.id },
          },
        })

    close()
  }

  return (
    <Grid fluid className={className}>
      <Row>
        <Col xs={24} md={18} className="main">
          <h2>Request Editor</h2>
          <Form className="grid grid-cols-7 gap-4">
            <FormGroup className="col-span-3">
              <ControlLabel>Name: </ControlLabel>
              <FormControl
                type="input"
                name="name"
                value={state.name}
                onChange={(value) => dispatch({ field: "name", value })}
              />
            </FormGroup>
            {(editMode === EditMode.Edit &&
              itemOrigin === ItemOrigin.Catalog) || (
              <>
                <FormGroup className="col-span-2">
                  <ControlLabel>Requestors: </ControlLabel>
                  <FormControl
                    accepter={TagPicker}
                    name="requestors"
                    data={data?.users?.map((user) => ({
                      label: user.name,
                      value: user.id,
                    }))}
                    value={state.requestors}
                    onChange={(value) =>
                      dispatch({ field: "requestors", value })
                    }
                  />
                </FormGroup>
                <FormGroup className="col-span-2">
                  <ControlLabel>Responders: </ControlLabel>
                  <FormControl
                    accepter={TagPicker}
                    name="responders"
                    data={data?.users?.map((user) => ({
                      label: user.name,
                      value: user.id,
                    }))}
                    value={state.responders}
                    onChange={(value) =>
                      dispatch({ field: "responders", value })
                    }
                  />
                </FormGroup>
              </>
            )}
            <FormGroup className="col-span-7">
              <ControlLabel>Description: </ControlLabel>
              <FormControl
                componentClass="textarea"
                name="description"
                value={state.description}
                onChange={(value) => dispatch({ field: "description", value })}
              />
            </FormGroup>
            <FormGroup className="col-span-7 tree">
              <BlockChildrenList
                blocks={draftBlock.children}
                addSubBlock={addSubBlock}
                onDelete={(childBlock) => deleteSubBlock(childBlock)}
              />
            </FormGroup>
            <FormGroup className="col-span-6 grid grid-cols-12 gap-4">
              <Button className="col-span-2" onClick={(e) => saveBlock(e)}>
                save
              </Button>
              <Button className="col-span-2" onClick={close}>
                cancel
              </Button>
            </FormGroup>
          </Form>
        </Col>
        <Col xs={24} md={6}>
          <BlockCatalogList />
        </Col>
      </Row>
    </Grid>
  )
}

const BlockEditor = styled(BlockEditorRaw)`
  background: var(--color-bg-secondary);
  ${tw``}
  .main {
    background var(--color-bg-inverse);
    ${tw`p-2`}
  }
  .rs-form-control-wrapper {
    width: 100%;
  }
  .rs-input,
  .tree {
    background var(--color-bg-secondary);
  }
`

export { BlockEditor }
