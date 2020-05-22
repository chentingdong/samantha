import React, { useState, useReducer } from "react"
import uuid from "uuid"
import { Animated } from "react-animated-css"
import { BlockEditor } from "./BlockEditor"
import { BlockOrDef } from "../models/interface"
import { blockBgColor, blockTextColor } from "../utils/Styles"
import { EditMode, ItemOrigin, MutationType } from "../models/enum"
import { AUTHENTICATED_USER } from "../operations/queries/authenticatedUser"
import { useQuery } from "@apollo/client"
import { reducer } from "../context/reducer"

const RequestItem: React.FC<{
  block: BlockOrDef
  itemOrigin?: ItemOrigin
  initShowEdit?: boolean
  actions: any
}> = ({
  block,
  itemOrigin = ItemOrigin.Catalog,
  initShowEdit = false,
  actions,
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

  const { data: authenticatedUser } = useQuery(AUTHENTICATED_USER)
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
          id: authenticatedUser?.authenticatedUser.id,
          name: authenticatedUser?.authenticatedUser.attributes.name,
          email: authenticatedUser?.authenticatedUser.attributes.email,
        },
      ],
    })
    return draftBlock
  }

  return (
    <div className="card m-3 p-1">
      <div className="d-flex justify-content-between">
        <div className="col">
          <h4>
            <span>{block.name}</span>
            {itemOrigin !== ItemOrigin.Catalog && (
              <span className={"m-2 " + blockTextColor(block)}>
                ({block.state})
              </span>
            )}
          </h4>
          <p>{block.description}</p>
          <p className="">
            {block.children?.map((child) => {
              return (
                <span
                  className={
                    "border rounded p-2 mr-2 d-inline-block " +
                    blockBgColor(child)
                  }
                  key={child.id}
                >
                  {child.name}
                </span>
              )
            })}
          </p>
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
        </div>
        <div className="col-2">
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
        </div>
      </div>
      {showEdit && (
        <div className="bg-light border" style={{ top: "0", zIndex: 10 }}>
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
    </div>
  )
}

export { RequestItem, ItemOrigin }
