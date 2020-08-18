import React, {useState} from "react"

import {Alert} from "react-bootstrap"
import {Loader} from "rsuite"

const Loading = ({className = "text-center"}) => (
  <Loader
    className={className}
    speed="fast"
    size="lg"
    center
    content="Loading..."
  />
)

const Error: React.FC<{
  message: string
  className?: string
  initShow?: boolean
}> = ({message = "", className = "", initShow = true}) => {
  const [show, setShow] = useState(initShow)

  return (
    <>
      {show && (
        <Alert
          variant="danger"
          className={className}
          onClose={() => setShow(false)}
          dismissible
        >
          {message}
        </Alert>
      )}
    </>
  )
}

export {Loading, Error}
