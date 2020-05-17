import React, { useState } from "react"
import uuid from "uuid"
import { Context } from "../context/store"
import { Animated } from "react-animated-css"
import { BlockEdit } from "./BlockEdit"
import { Block } from "../context/interface"
import { bgColor } from "../utils/styles"

const RequestItem: React.FC<{
  block: Block,
  children?: React.ReactNode,
}> = ({ block, children }) => {
  const { state, dispatch } = React.useContext(Context)
  const [showEdit, setShowEdit] = useState(false)

  const editRequestDef = (blockCreateInput) => {
    dispatch({ type: "set", data: { blockCreateInput } })
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
                    "border rounded p-2 mr-2 d-inline-block " + bgColor(child)
                  }
                  key={child.id}
                >
                  {child.name}
                </span>
              )
            })}
          </p>
          {children}
        </div>
        <div className="col-3">
          <button
            className="btn-primary border rounded m-1"
            onClick={(e) => makeRequest()}
          >
            Make a request
          </button>
          <br />
          <button
            className="btn-primary border rounded m-1"
            onClick={(e) => editRequestDef(block)}
          >
            View/Edit
          </button>
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
            />
          </Animated>
        </div>
      )}
    </div>
  )
}

export { RequestItem }
