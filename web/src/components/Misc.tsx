import React, { useState } from "react"
import { Spinner, Alert } from "react-bootstrap"
import { Loader } from "rsuite"

const Loading = ({ className }) => (
  <Loader
    className={className}
    speed="fast"
    size="lg"
    center
    content="Loading..."
  />
)

const Error = ({ message, initShow = true }) => {
  const [show, setShow] = useState(initShow)

  return (
    <>
      {show && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          {message}
        </Alert>
      )}
    </>
  )
}

export { Loading, Error }
