import React, { useState, useContext, createContext } from "react"
import uuid from "uuid"
import { Context } from "../context/store"
import { Animated } from "react-animated-css"
import { BlockEdit } from "./BlockEdit"
import { Block } from "../context/interface"
import { blockBgColor, blockTextColor } from "../utils/styles"
import { EditMode, ItemOrigin, MutationType } from "../context/enum"
import { COMPLETE_ONE_BLOCK } from "../../operations/mutations/completeOneBlock"
import { useMutation } from "@apollo/client"

const RequestItem: React.FC<{
  block: Block,
  itemOrigin?: ItemOrigin,
}> = ({ block, itemOrigin = ItemOrigin.Catalog }) => {
  // global context
  const { state, dispatch } = useContext(Context)

  // TODO: move into context at this level
  const [showEdit, setShowEdit] = useState(false)
  const [origin, setOrigin] = useState(itemOrigin)
  const [editMode, setEditMode] = useState(EditMode.Edit)

  const [completeOneBlock] = useMutation(COMPLETE_ONE_BLOCK)

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
      inCatalog: false,
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
        <div className="col-sm">
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
          {origin === ItemOrigin.Made && (
            <p className="text-secondary">
              {"Assigned to: "}
              {block.responders?.map((user) => user.name).join(", ")}
            </p>
          )}
          {origin === ItemOrigin.Received && (
            <p className="text-secondary">
              {"Requested by: "}
              {block.requestors?.map((user) => user.name).join(", ")}
            </p>
          )}
        </div>
        <div className="col-sm-2">
          <div className="row">
            <button
              className="btn btn-link border rounded m-1 col"
              onClick={() => editRequestDef(block)}
            >
              View/Edit
            </button>
          </div>
          {origin === ItemOrigin.Catalog && (
            <div className="row">
              <button
                className="btn btn-link border rounded m-1 col"
                onClick={() => makeRequest()}
              >
                Make a request
              </button>
            </div>
          )}
          {origin === ItemOrigin.Received && block.state === "ACTIVE" && (
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
              itemOrigin={origin}
              editMode={editMode}
            />
          </Animated>
        </div>
      )}
    </div>
  )
}

export { RequestItem, ItemOrigin }
