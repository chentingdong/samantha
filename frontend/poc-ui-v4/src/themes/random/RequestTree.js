import React from "react"
import Tree from "react-d3-tree"

import blockStories from "../../../data/storybook-blocks.json"
import styled from "styled-components"

const treeStyles = {
  link: {
    stroke: "blue",
    strokeWidth: 3,
  },
  nodes: {
    node: {
      circle: {
        fill: "blue",
        stroke: "blue",
      },
    },
    leafNode: {
      circle: {
        fill: "green",
        stroke: "green",
      },
    },
  },
}
const RequestTreeRaw = () => {
  return (
    <div id="treeWrapper" className="w-full h-screen">
      <Tree
        data={blockStories}
        translate={{ x: 400, y: 400 }}
        styles={treeStyles}
      />
    </div>
  )
}

const Styles = styled.div.attrs({
  className: "bg-gray-400",
})`
  font-size: 1.5em;
`

const RequestTree = () => {
  return (
    <Styles>
      <RequestTreeRaw />
    </Styles>
  )
}
export { RequestTree }
