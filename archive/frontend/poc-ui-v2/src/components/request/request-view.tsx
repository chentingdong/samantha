import * as React from 'react'
import { Context } from '../context/store'
import { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { Chat } from './chat'

export const RequestViewRequester = () => {
  const { state, dispatch } = useContext(Context)

  const close = () => {
    dispatch({ type: 'setUi', data: { showRequestViewRequester: false } })
  }

  return (
    state.uiState.showRequestViewRequester && (
      <div
        className="bg-white position-absolute col-10 offset-2 vh-100"
        style={{ top: '0' }}
      >
        <div className="row">
          <div className="col-8">
            <button
              className="position-absolute btn btn-link m-2"
              style={{ right: '0' }}
              onClick={close}
            >
              back to request menu
            </button>
            <h1>Requester surface</h1>
            <div>
              <p>this is the requester's view for request </p>
              {JSON.stringify(state.currentRequest, null, 2)}
            </div>
          </div>
          <div className="col-4 border-left p-0">
            <Chat />
          </div>
        </div>
      </div>
    )
  )
}

export const RequestViewResponder = () => {
  const { state, dispatch } = useContext(Context)
  const close = () => {
    dispatch({ type: 'setUi', data: { showRequestViewResponder: false } })
  }

  return (
    state.uiState.showRequestViewResponder && (
      <div
        className="bg-white position-absolute col-10 offset-2 vh-100"
        style={{ top: '0' }}
      >
        <div className="row">
          <div className="col-8">
            <button
              className="position-absolute btn btn-link m-2"
              style={{ right: '0' }}
              onClick={close}
            >
              back to request menu
            </button>
            <h1>Responder surface</h1>
            <p>this is the responder's view for request </p>
            <pre>{JSON.stringify(state.currentRequest, null, 4)}</pre>
          </div>
          <div className="col-4 border-left p-0">
            <Chat />
          </div>
        </div>
      </div>
    )
  )
}
