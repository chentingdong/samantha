import React, { useState, useContext, createContext } from "react"
import uuid from "uuid"
import { Context } from "../context/store"
import { Animated } from "react-animated-css"
import { BlockEdit } from "./BlockEdit"
import { Block, BlockDef } from "../models/interface"
import { blockBgColor, blockTextColor } from "../utils/Styles"
import { EditMode, ItemOrigin, MutationType } from "../models/enum"

const RequestItem: React.FC<{
  block: Block | BlockDef
  itemOrigin?: ItemOrigin
  initShowEdit?: boolean
  actions: any
}> = ({
  block,
  itemOrigin = ItemOrigin.Catalog,
  initShowEdit = false,
  actions,
}) => {
  // global context
  const { state, dispatch } = useContext(Context)

  // TODO: move into context at this level
  const [showEdit, setShowEdit] = useState(initShowEdit)
  const [editMode, setEditMode] = useState(EditMode.Edit)

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

  const editRequestDef = (blockCreateInput) => {
    dispatch({ type: "set", data: { blockCreateInput } })
    setEditMode(EditMode.Edit)
    setShowEdit(true)
  }

  const makeRequest = () => {
    const blockCreateInput = Object.assign({}, block, {
      __mutation_type__: MutationType.Create,
      id: uuid.v4(),
      name: "",
      state: "ACTIVE",
      requestors: [
        {
          id: state.user.id,
          name: state.user.attributes.name,
          email: state.user.attributes.email,
        },
      ],
    })
    dispatch({ type: "set", data: { blockCreateInput } })
    setEditMode(EditMode.Create)
    setShowEdit(true)
  }

  return (
    <div className="card mt-2 pt-2">
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
              onClick={() => editRequestDef(block)}
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
            <BlockEdit
              blockCreateInput={state.blockCreateInput}
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
