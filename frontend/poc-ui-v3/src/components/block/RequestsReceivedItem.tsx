import React, { useState } from "react"
import uuid from "uuid"
import { Context } from "../context/store"
import { Animated } from "react-animated-css"
import { BlockEdit } from "./BlockEdit"

const RequestsReceivedItem = ({ block }) => {
  const { state, dispatch } = React.useContext(Context)
  const [showEdit, setShowEdit] = useState(false)

  const editRequestDef = (block) => {
    dispatch({ type: 'set', data: { blockCreateInput: block} })
    setShowEdit(true)
  }

  return (
    <div className="card mt-2 pt-2">
      <div className="d-flex justify-content-between">
        <div className="col-7">
          <h4>{block.name}</h4>
          <p>{block.description}</p>
          <p>Owner: {block.requestors[0]?.name}</p>
          <p>
            {block.children?.map((block) => {
              return (
                <span className="border p-2 mr-2" key={block.id}>
                  {block.name} ({block.state})
                </span>
              )
            })}
          </p>
        </div>
        <div className="col-3">
          <button
            className="btn btn-link"
            onClick={(e) => editRequestDef(block)}
          >
            View/Edit
          </button>
        </div>
      </div>
      {showEdit && (
        <div
          className="position-fixed vh-100 bg-white"
          style={{ top: "0", zIndex: 10 }}
        >
          <Animated
            animationIn="slideInRight"
            animationInDuration={300}
            animationOut="bounceOutRight"
            isVisible={true}
          >
            <BlockEdit
              block={block}
              close={(e) => setShowEdit(false)}
            />
          </Animated>
        </div>
      )}
    </div>
  )
}

export { RequestsReceivedItem }
