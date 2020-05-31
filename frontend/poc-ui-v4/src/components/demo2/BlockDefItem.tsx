import React, { useState, useReducer } from "react"
import uuid from "uuid"
import { BlockOrDef } from "../../models/interface"
import { EditMode, ItemOrigin, MutationType } from "../../models/enum"
import { AUTH_USER } from "../../operations/queries/authUser"
import { useQuery } from "@apollo/client"
import { reducer } from "../../context/reducer"
import { Grid, Row, Col } from "rsuite"
import { Card } from "../Card"
import styled from "styled-components"
import tw from "tailwind.macro"
import { Button } from "../Button"

type BlockDefItemType = {
  block: BlockOrDef
  initShowEdit?: boolean
  actions: any
  className?: string
}

const BlockDefItemRaw: React.FC<BlockDefItemType> = ({
  block,
  initShowEdit = false,
  actions,
  className = "",
}) => {
  // state on each RequestItem object
  // by default (edit mode) draft is a copy of the current block object
  // when making a request from definitoin, createDraftBlock() needs to be called first
  const [state, dispatch] = useReducer(reducer, { draftBlock: block })
  const setDraftBlock = (draftBlock) => {
    dispatch({ type: "set", data: { draftBlock } })
  }
  const [showEdit, setShowEdit] = useState(initShowEdit)
  const [editMode, setEditMode] = useState(EditMode.Edit)

  const { data } = useQuery(AUTH_USER)
  const { createOneBlock, updateOneBlock, completeOneBlock } = actions

  const markComplete = (blockToComplete) => {
    blockToComplete.children.map((child) => markComplete(child))
    completeOneBlock({
      variables: {
        data: { state: "COMPLETE" },
        where: { id: blockToComplete.id },
      },
    })
  }

  const editRequestDef = () => {
    setEditMode(EditMode.Edit)
    setShowEdit(true)
  }

  const makeRequest = () => {
    setDraftBlock(createDraftBlock(block))
    setEditMode(EditMode.Create)
    setShowEdit(true)
  }

  const createDraftBlock = (blockDef) => {
    const draftBlock = {
      ...blockDef,
      __mutation_type__: MutationType.Create,
      id: uuid.v4(),
      name: "",
      state: "ACTIVE",
      requestors: [
        {
          id: data?.authUser?.id,
          name: data?.authUser?.name,
          email: data?.authUser?.email,
        },
      ],
    }
    return draftBlock
  }

  const stateStyle = (blockWithState) => {
    return blockWithState.state || "default"
  }

  return (
    <Card className={className}>
      <Grid fluid>
        <Col xs={18}>
          <h4>
            <span>{block.name}</span>
          </h4>
          <p>{block.description}</p>
          <div className="flex flex-row">
            {block.children?.map((child) => {
              return (
                <span
                  className={`child block-state-${stateStyle(child)}`}
                  key={child.id}
                >
                  {child.name}
                </span>
              )
            })}
          </div>
        </Col>
        <Col xs={6} className="grid grid-cols-1 gap-1">
          <Button onClick={() => editRequestDef()}>View/Edit</Button>
          <Button onClick={() => makeRequest()}>Make a request</Button>
        </Col>
      </Grid>
    </Card>
  )
}

const BlockDefItem = styled(BlockDefItemRaw)`
  ${tw`p-2 pb-4 my-2 rounded border shadow`}
  border-style: dotted;
  border-color: var(--color-text-secondary);
  .editor {
    transition: left 2s;
  }
  .child {
    ${tw`border mr-1 my-2 p-1 text-sm rounded`}
  }
`

export { BlockDefItem }
// export { RequestItem, ItemOrigin }
