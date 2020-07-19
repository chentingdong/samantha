import * as React from "react"

interface TODOProps {}

const TODO: React.FC<TODOProps> = (props) => {
  return (
    <div>
      <span className="bg-yellow-500">TODO: {props.children}</span>
    </div>
  )
}
export { TODO }
