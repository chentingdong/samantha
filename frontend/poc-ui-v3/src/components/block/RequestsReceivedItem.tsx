import React, { useState } from 'react'
import uuid from 'uuid'
import { Context } from '../context/store'
import { Animated } from 'react-animated-css'
import { BlockEdit } from './BlockEdit'

export const RequestsReceivedItem = ({ block }) => {
  const { state, dispatch } = React.useContext(Context)
  const [currentBlock, setCurrentBlock] = React.useState(block)
  const [showEdit, setShowEdit] = useState(false)

  let blockInst = Object.assign({}, block, {
    id: uuid.v4(),
    name: '',
    requester: state.user.id,
  })

  const editRequestDef = () => {
    setCurrentBlock(blockInst)
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
            {block.children?.map((block, index2) => {
                return (
                  <span className="border p-2 mr-2" key={`block-${index2}`}>
                    {block.name} ({block.state})
                  </span>
                )
              })}
          </p>
        </div>
        <div className="col-3">
          <button className="btn btn-link" onClick={editRequestDef}>
            View/Edit
          </button>
        </div>
      </div>
      {showEdit && (
        <div
          className="position-fixed vh-100 bg-white"
          style={{ top: '0', zIndex: 10 }}
        >
          <Animated
            animationIn="slideInRight"
            animationInDuration={300}
            animationOut="bounceOutRight"
            isVisible={true}
          >
            <BlockEdit block={currentBlock} close={(e) => setShowEdit(false)} />
          </Animated>
        </div>
      )}
    </div>
  )
}