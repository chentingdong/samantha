import React from 'react'
import uuid from 'uuid'
import { Context } from '../context/store'
import { BlockDef } from '../context/interface'
import { Animated } from 'react-animated-css'
import { EditRequestDef } from '../request/edit-request-def'

export const RequestCatalogItem = ({ block }) => {
  const { state, dispatch } = React.useContext(Context)
  const [currentBlock, setCurrentBlock] = React.useState(block)
  let blockInst = Object.assign({}, block, {
    id: uuid.v4(),
    name: '',
    requester: state.user.id,
  })

  const editRequestDef = () => {
    // dispatch({
    //   type: 'set',
    //   data: { currentRequestDef: currentRequestDef },
    // })
    setCurrentBlock(blockInst)

    dispatch({
      type: 'setUi',
      data: { showEditRequestDef: true },
    })
  }

  const makeRequest = (block) => {
    setCurrentBlock(blockInst)
    // dispatch({
    //   type: 'set',
    //   data: { currentRequest: currentRequest },
    // })
    dispatch({
      type: 'setUi',
      data: { showEditRequest: true },
    })
  }

  return (
    <div className="card mt-2 pt-2">
      <div className="d-flex justify-content-between">
        <div className="col-7">
          <h4>{block.name}</h4>
          <p>{block.description}</p>
          <p>Owner: {block.requester}</p>
          <p>
            {block.blocks &&
              block.blocks?.map((block, index2) => {
                return (
                  <span className="border p-2 mr-2" key={`block-${index2}`}>
                    {block.name}
                  </span>
                )
              })}
          </p>
        </div>
        <div className="col-3">
          <button
            className="btn btn-link"
            onClick={(e) => makeRequest(currentBlock)}
          >
            Make a request
          </button>
          <br />
          <button className="btn btn-link" onClick={editRequestDef}>
            View/Edit
          </button>
        </div>
      </div>
      {state.uiState.showEditRequestDef && (
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
            <EditRequestDef block={currentBlock} />
          </Animated>
        </div>
      )}
    </div>
  )
}
