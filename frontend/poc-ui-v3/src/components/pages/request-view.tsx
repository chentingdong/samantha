import * as React from "react"
import { Context } from "../context/store"
import { useContext } from "react"
import { Chat } from "../chat/chat"

const RequestViewRequester = () => {
  const { state, dispatch } = useContext(Context)

  const close = () => {
    dispatch({ type: "setUi", data: { showRequestViewRequester: false } })
  }

  return (
    state.uiState.showRequestViewRequester && (
      <div
        className="bg-white position-absolute col-10 offset-2 vh-100"
        style={{ top: "0" }}
      >
        <div className="row">
          <div className="col-8">
            <button
              className="position-absolute btn btn-link m-2"
              style={{ right: "0" }}
              onClick={close}
            >
              back to request menu
            </button>
            <h1>Requester surface</h1>
          </div>
          <div className="col-4 border-left p-0">
            <Chat />
          </div>
        </div>
      </div>
    )
  )
}

const RequestViewResponder = () => {
  const { state, dispatch } = useContext(Context)
  const close = () => {
    dispatch({ type: "setUi", data: { showRequestViewResponder: false } })
  }

  return (
    state.uiState.showRequestViewResponder && (
      <div
        className="bg-white position-absolute col-10 offset-2 vh-100"
        style={{ top: "0" }}
      >
        <div className="row">
          <div className="col-8">
            <button
              className="position-absolute btn btn-link m-2"
              style={{ right: "0" }}
              onClick={close}
            >
              back to request menu
            </button>
            <h1>Responder surface</h1>
          </div>
          <div className="col-4 border-left p-0">
            <Chat />
          </div>
        </div>
      </div>
    )
  )
}

export { RequestViewRequester, RequestViewResponder }
