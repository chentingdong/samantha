import React, { useState, useContext, createContext } from "react"
import uuid from "uuid"
import { Context } from "../context/store"
import { Animated } from "react-animated-css"
import { BlockEdit } from "./BlockEdit"
import { Block } from "../context/interface"
import { btnBgColor } from "../utils/styles"
import { EditMode, ItemOrigin } from "../context/enum"

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

  const editRequestDef = (blockCreateInput) => {
    dispatch({ type: "set", data: { blockCreateInput } })
    setEditMode(EditMode.Edit)
    setShowEdit(true)
  }

  const makeRequest = () => {
    const blockCreateInput = Object.assign({}, block, {
      __mutation_type__: "CREATE",
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
        <div className="col-8">
          <h4>{block.name}</h4>
          <p>{block.description}</p>
          <p className="">
            {block.children?.map((child) => {
              return (
                <span
                  className={
                    "border rounded p-2 mr-2 d-inline-block " +
                    btnBgColor(child)
                  }
                  key={child.id}
                >
                  {child.name}
                </span>
              )
            })}
          </p>
          {origin === ItemOrigin.Made && (
            <p className="text-secondary text-right">
              {"Assigned to: "}
              {block.responders?.map((user) => user.name).join(", ")}
            </p>
          )}
          {origin === ItemOrigin.Received && (
            <p className="text-secondary text-right">
              {"Requested by: "}
              {block.requestors?.map((user) => user.name).join(", ")}
            </p>
          )}
        </div>
        <div className="col-3 container">
          <div className="row">
            <button
              className="btn-primary border rounded m-1 "
              onClick={(e) => editRequestDef(block)}
            >
              View/Edit
            </button>
          </div>
          {origin === ItemOrigin.Catalog ? (
            <div className="row">
              <button
                className="btn-primary border rounded m-1"
                onClick={(e) => makeRequest()}
              >
                Make a request
              </button>
            </div>
          ) : (
            <div className="row">
              <button
                className={
                  "btn-primary border rounded m-1 " + btnBgColor(block)
                }
                onClick={(e) => {
                  // change state
                }}
              >
                {block.state}
              </button>
            </div>
          )}
        </div>
      </div>
      {showEdit && (
        <div className="bg-light" style={{ top: "0", zIndex: 10 }}>
          <Animated
            animationIn="fadeInRight"
            animationInDuration={300}
            animationOut="bounceOutRight"
            isVisible={true}
          >
            <BlockEdit
              block={state.blockCreateInput}
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
