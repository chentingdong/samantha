import uuid from "uuid"
import React, { useEffect, useCallback } from "react"
import { useForm } from "react-hook-form"
import { BlockOrDef } from "../models/interface"
import { BlockCatalogList } from "./BlockCatalogList"
import { BlockChildrenList } from "./BlockChildrenList"
import { OptionsUsers } from "./OptionsUsers"
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
  const { register, getValues, setValue, handleSubmit } = useForm({
    defaultValues: draftBlock,
  })
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

    // console.log(
    //   `draftBlockTransformed:\n${JSON.stringify(draftBlockTransformed)}`
    // )
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
              <FormControl type="input" ref={register} name="name" />
            </FormGroup>
            {(editMode === EditMode.Edit &&
              itemOrigin === ItemOrigin.Catalog) || (
              <>
                <FormGroup className="col-span-2">
                  <ControlLabel>Requestors: </ControlLabel>
                  <TagPicker
                    ref={register}
                    data={data?.users?.map((user) => ({
                      label: user.name,
                      value: user.id,
                    }))}
                    defaultValue={draftBlock.requestors?.map((user) => user.id)}
                  />
                </FormGroup>
                <FormGroup className="col-span-2">
                  <ControlLabel>Responders: </ControlLabel>
                  <TagPicker
                    ref={register}
                    data={data?.users?.map((user) => ({
                      label: user.name,
                      value: user.id,
                    }))}
                    defaultValue={draftBlock.responders?.map((user) => user.id)}
                  />
                </FormGroup>
              </>
            )}
            <FormGroup className="col-span-7">
              <ControlLabel>Description: </ControlLabel>
              <FormControl
                componentClass="textarea"
                ref={register}
                name="description"
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
