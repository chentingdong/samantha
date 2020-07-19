import React, { useState } from "react"
import { MagicWord } from "./MagicWord"

interface TODOProps {
  className?: string
  position?: "left" | "right"
}

const TODO: React.FC<TODOProps> = ({
  className,
  position = "left",
  ...props
}) => {
  const [show, setShow] = useState(false)
  return (
    <div
      className={`${className} relative ${
        show ? "opacity-75 hover:opacity-100" : "opacity-0"
      }`}
    >
      <div className={`${className} bg-yellow-500 absolute ${position}-0`}>
        TODO: {props.children}
      </div>
      <MagicWord
        showWord="todo"
        hideWord="done"
        show={show}
        setShow={setShow}
      ></MagicWord>
    </div>
  )
}
export { TODO }
