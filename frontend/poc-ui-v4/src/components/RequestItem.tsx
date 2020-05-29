import React, { useState, useReducer } from "react"
import uuid from "uuid"
import { Animated } from "react-animated-css"
import { BlockEditor } from "./BlockEditor"
import { BlockOrDef } from "../models/interface"
import { EditMode, ItemOrigin, MutationType } from "../models/enum"
import { AUTH_USER } from "../operations/queries/authUser"
import { useQuery } from "@apollo/client"
import { reducer } from "../context/reducer"
import { Grid, Row, Col } from "rsuite"
import { Card } from "./Card"
import styled from "styled-components"
import tw from "tailwind.macro"

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
    const draftBlock = Object.assign({}, blockDef, {
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
    })
    return draftBlock
  }

  const stateStyle = (block) => {
    return block.state ? block.state : "default"
  }

  return (
    <Card className={className}>
      <Grid fluid>
        <Col xs={18}>
          <h4>
            <span>{block.name}</span>
            {itemOrigin !== ItemOrigin.Catalog && (
              <span className={`block-state-${stateStyle(block)}`}>
                ({block.state})
              </span>
            )}
          </h4>
          <p>{block.description}</p>
          <div className="">
            {block.children?.map((child) => {
              return (
                <span
                  className={`border rounded p-2 m-2 inline-block block-state-${stateStyle(
                    child
                  )}`}
                  key={child.id}
                >
                  {child.name}
                </span>
              )
            })}
          </div>
          {itemOrigin === ItemOrigin.Made && (
            <p className="text-secondary">
              {"Assigned to: "}
              {block.responders?.map((user) => user.name).join(", ")}
            </p>
          )}
          {itemOrigin === ItemOrigin.Received && (
            <p className="text-secondary">
              {"Requested by: "}
              {block.requestors?.map((user) => user.name).join(", ")}
            </p>
          )}
        </Col>
        <Col xs={6}>
          <div className="row">
            <button
              className="btn btn-link border rounded m-1 col"
              onClick={() => editRequestDef()}
            >
              View/Edit
            </button>
          </div>
          {itemOrigin === ItemOrigin.Catalog && (
            <div className="row">
              <button
                className="btn btn-link border rounded m-1 col"
                onClick={() => makeRequest()}
              >
                Make a request
              </button>
            </div>
          )}
          {itemOrigin === ItemOrigin.Received && block.state === "ACTIVE" && (
            <div className="row">
              <button
                className="btn btn-link border rounded m-1 col"
                onClick={() => markComplete(block)}
              >
                Mark as Complete
              </button>
            </div>
          )}
        </Col>
      </Grid>
      {showEdit && (
        <div className="" style={{ top: "0", zIndex: 10 }}>
          <Animated
            animationIn="fadeInRight"
            animationInDuration={300}
            animationOut="bounceOutRight"
            isVisible={true}
          >
            <BlockEditor
              draftBlock={state.draftBlock}
              setDraftBlock={setDraftBlock}
              close={() => setShowEdit(false)}
              itemOrigin={itemOrigin}
              editMode={editMode}
              actions={{ createOneBlock, updateOneBlock }}
            />
          </Animated>
        </div>
      )}
    </Card>
  )
}

const RequestItem = styled(RequestItemRaw)`
  ${tw`p-2 pb-4 my-2 rounded border`}
  border-color: var(--color-text-secondary);
`

export { RequestItem }
// export { RequestItem, ItemOrigin }
