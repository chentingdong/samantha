import { Loader, Message } from "rsuite"
import React, { useEffect, useState } from "react"

const Loading = ({ className = "text-center" }) => (
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
  duration?: number
}> = ({ message = "", className = "", initShow = true, duration = 5000 }) => {
  const [show, setShow] = useState(initShow)

  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, duration)
  }, [show])

  return (
    <>
      {show && (
        <Message
          closable
          showIcon
          type="warning"
          title="Warning"
          className={`${className} fixed top-0 right-0 mt-16 mr-4 w-1/3 z-50 opacity-75`}
          onClose={() => setShow(false)}
          description={message}
        />
      )}
    </>
  )
}

export { Loading, Error }
