import React, { useContext } from 'react'
import { Context } from '../context/store'
import { Block } from '../context/interface'

function Request({ request }) {
  const { state, dispatch } = useContext(Context)

  const editRequest = () => {
    let currentRequest: Block = request
    dispatch({
      type: 'set',
      data: { currentRequest: currentRequest },
    })
    dispatch({
      type: 'setUi',
      data: { showEditRequest: true },
    })
  }

  const requestView = () => {
    dispatch({ type: 'set', data: { currentRequest: request } })
    if (isRequester(request, state)) {
      dispatch({ type: 'setUi', data: { showRequestViewRequester: true } })
    } else if (isResponder(request, state)) {
      dispatch({ type: 'setUi', data: { showRequestViewResponder: true } })
    }
  }

  return (
    <div className="card mt-2">
      <div className="d-flex justify-content-between">
        <div className="col-8 btn text-left" onClick={requestView}>
          <h4>{request.name}</h4>
          <p>{request.description}</p>
          <p>Requester: {request.requester}</p>
          <p>
            Responders:
            {request.responders.map((responder, index) => {
              return (
                <span key={`responder-${index}`} className="p-2">
                  {responder}
                </span>
              )
            })}
          </p>
          <p>
            {request.blocks?.map((block, index2) => {
              return (
                <span className="border p-2 mr-2" key={`block-${index2}`}>
                  {block.name}
                </span>
              )
            })}
          </p>
        </div>
        <div className="col-4 text-right">
          <button className="btn btn-link" onClick={editRequest}>
            View/Edit
          </button>
        </div>
      </div>
    </div>
  )
}

function isRequester(request, state) {
  return request.requester === state.user.id
}

function isResponder(request, state) {
  return request.responders.indexOf(state.user.id) > -1
}

function RequestsMade() {
  const { state } = useContext(Context)

  return (
    <div>
      <h2>Requests Made</h2>
      {state.requests
        .filter((req) => isRequester(req, state))
        .map((request) => {
          return <Request key={request.id} request={request} />
        })}
    </div>
  )
}

function RequestsReceived() {
  const { state, dispatch } = useContext(Context)
  return (
    <div>
      <h2>Requests Received</h2>
      {state.requests
        .filter((req) => isResponder(req, state))
        .map((request) => {
          return <Request key={request.id} request={request} />
        })}
    </div>
  )
}

export { RequestsMade, RequestsReceived }
