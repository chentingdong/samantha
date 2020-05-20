import React, { useState } from "react"
import { Spinner, Alert } from "react-bootstrap"

const Loading = () => <Spinner animation="border" />

const Error = ({ message, initShow = true }) => {
  const [show, setShow] = useState(initShow)

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        {message}
      </Alert>
    )
  }
  return <></>
}

export { Loading, Error }
