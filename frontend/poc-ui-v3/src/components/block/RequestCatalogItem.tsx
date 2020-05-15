import React, { useState } from 'react'
import uuid from 'uuid'
import { Context } from '../context/store'
import { Animated } from 'react-animated-css'
import { BlockEdit } from './BlockEdit'

export const RequestCatalogItem = ({ block }) => {
  const { state, dispatch } = React.useContext(Context)
  const [currentBlock, setCurrentBlock] = React.useState(block)
  const [showEdit, setShowEdit] = useState(false)

  let blockInst = Object.assign({}, block, {
    name: '',
    inCatalog: false,
    state: 'ACTIVE',
    requester: state.user.id,
    // requestors: [
    //   {
    //     id: state.user.id,
    //     name: state.user.attributes.name,
    //     email: state.user.attributes.email,
    //   },
    // ],
  })

  const editRequestDef = (block) => {
    setCurrentBlock(block)
    setShowEdit(true)
  }

  const makeRequest = (block) => {
    // const blockInst = Object.assign({}, block, {
    //   // clear name/description or not?
    //   // name: '',
    //   // description: '',
    // })
    // delete blockInst.id
    setCurrentBlock(blockInst)
    setShowEdit(true)
  }

  return (
    <div className="card mt-2 pt-2">
      <div className="d-flex justify-content-between">
        <div className="col-7">
          <h4>{block.name}</h4>
          <p>{block.description}</p>
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
          <button className="btn btn-link" onClick={(e) => makeRequest(block)}>
            Make a request
          </button>
          <br />
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
          style={{ top: '0', zIndex: 10 }}
        >
          <Animated
            animationIn="slideInRight"
            animationInDuration={300}
            animationOut="bounceOutRight"
            isVisible={true}
          >
            <BlockEdit
              block={currentBlock}
              setCurrentBlock={setCurrentBlock}
              close={(e) => setShowEdit(false)}
            />
          </Animated>
        </div>
      )}
    </div>
  )
}
