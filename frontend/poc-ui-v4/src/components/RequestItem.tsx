import React, { useState, useReducer } from "react"
import uuid from "uuid"
import { Animated } from "react-animated-css"
import { BlockEditor } from "./BlockEditor"
import { BlockOrDef, Block } from "../models/interface"
import { EditMode, ItemOrigin, MutationType, Typename } from "../models/enum"
import { AUTH_USER } from "../operations/queries/authUser"
import { useQuery } from "@apollo/client"
import { reducer } from "../context/reducer"
import { Grid, Row, Col, IconButton, Icon } from "rsuite"
import { Card } from "./Card"
import styled from "styled-components"
import tw from "tailwind.macro"
import { Button } from "./Button"
import { setUiState } from "../operations/mutations/setUiState"
import { createBlock } from "../operations/blockOperations"
import cloneDeep from "lodash/cloneDeep"

type RequestItemType = {
  block: BlockOrDef
  itemOrigin?: ItemOrigin
  initShowEdit?: boolean
  actions: any
  className?: string
}

const RequestItemRaw: React.FC<RequestItemType> = ({
  block,
  itemOrigin = ItemOrigin.Catalog,
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
            {itemOrigin !== ItemOrigin.Catalog && (
              <span className={`block-state-${stateStyle(block)}`}>
                ({(block as Block).state})
              </span>
            )}
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
          {itemOrigin === ItemOrigin.Made && (
            <p className="text-secondary">
              "Assigned to: "
              {(block as Block).responders?.map((user) => user.name).join(", ")}
            </p>
          )}
          {itemOrigin === ItemOrigin.Received && (
            <p className="text-secondary">
              {"Requested by: "}
              {(block as Block).requestors?.map((user) => user.name).join(", ")}
            </p>
          )}
        </Col>
        <Col xs={6} className="grid grid-cols-1 gap-1">
          {itemOrigin === ItemOrigin.Received &&
            (block as Block).state === "ACTIVE" && (
              <IconButton
                appearance="default"
                icon={<Icon icon="check" />}
                onClick={() => markComplete(block)}
              >
                Mark as Complete
              </IconButton>
            )}
          {itemOrigin === ItemOrigin.Catalog && (
            <IconButton
              appearance="default"
              icon={<Icon icon="bell-o" />}
              onClick={() => {
                setUiState(
                  {
                    showEditor: true,
                    editingTypename: Typename.Block,
                    editorMode: EditMode.Create,
                    draftBlock: createBlock(
                      cloneDeep(block),
                      Typename.Block,
                      data?.authUser
                    ),
                  },
                  true
                )
              }}
            >
              Make a Bell
            </IconButton>
          )}
          <IconButton
            appearance="default"
            icon={<Icon icon="edit" />}
            onClick={(e) => {
              const editingTypename =
                block.__typename === "Block"
                  ? Typename.Block
                  : Typename.BlockDef
              setUiState(
                {
                  showEditor: true,
                  editingTypename,
                  editorMode: EditMode.Edit,
                  draftBlock: { ...block, __typename: editingTypename },
                },
                true
              )
            }}
          >
            View/Edit <i>New!</i>
          </IconButton>
        </Col>
      </Grid>
      {showEdit && (
        <div className="editor mt-4">
          <BlockEditor
            draftBlock={state.draftBlock}
            setDraftBlock={setDraftBlock}
            close={() => setShowEdit(false)}
            itemOrigin={itemOrigin}
            editMode={editMode}
            actions={{ createOneBlock, updateOneBlock }}
          />
        </div>
      )}
    </Card>
  )
}

const RequestItem = styled(RequestItemRaw)`
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

export { RequestItem }
// export { RequestItem, ItemOrigin }
