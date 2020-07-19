import React, { useState } from "react"
import { MagicWord } from "./MagicWord"

interface TODOProps {}

const TODO: React.FC<TODOProps> = (props) => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <MagicWord
        className="bg-yellow-500"
        showWord="todo"
        hideWord="done"
        show={show}
        setShow={setShow}
      >
        <span>TODO: {props.children}</span>
      </MagicWord>
    </div>
  )
}
export { TODO }
