import * as React from 'react'
import { Context } from '../context/store'
import { useContext } from 'react'
import { Modal } from 'react-bootstrap'

export const RequestViewRequester = () => {
  const { state, dispatch } = useContext(Context)

  const close = () => {
    dispatch({ type: 'setUi', data: { showRequestViewRequester: false } })
  }

  return (
    <Modal
      size="lg"
      show={state.uiState.showRequestViewRequester}
      onHide={close}
    >
      <Modal.Header closeButton>
        <Modal.Title>Requester surface</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        this is the requester's view for request{' '}
        {JSON.stringify(state.currentRequest)}
      </Modal.Body>
    </Modal>
  )
}

export const RequestViewResponder = () => {
  const { state, dispatch } = useContext(Context)
  const close = () => {
    dispatch({ type: 'setUi', data: { showRequestViewResponder: false } })
  }

  return (
    <Modal
      size="lg"
      show={state.uiState.showRequestViewResponder}
      onHide={close}
    >
      <Modal.Header closeButton>
        <Modal.Title>Responder surface</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        this is the responder's view for request{' '}
        {JSON.stringify(state.currentRequest)}
      </Modal.Body>
    </Modal>
  )
}
