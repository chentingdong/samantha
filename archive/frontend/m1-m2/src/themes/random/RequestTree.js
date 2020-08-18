import React from "react"
import Tree from "react-d3-tree"
import blockStories from "../../../data/storybook-blocks.json"
import styled from "styled-components"

const treeStyles = {
  link: {
    stroke: "blue",
    strokeWidth: 2,
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

const NodeLabel = ({ className, nodeData }) => {
  return (
    <div className={`${className} border text-xs bg-white`}>
      <label>{nodeData.name}</label>
    </div>
  )
}

const RequestTreeRaw = () => {
  return (
    <div id="treeWrapper" className="w-full h-screen">
      <Tree
        data={blockStories}
        translate={{ x: 400, y: 400 }}
        collapsible={false}
        styles={treeStyles}
        orientation="vertical"
        allowForeignObjects
        circleRadius="2"
        onClick={(e) => alert("a")}
        nodeLabelComponent={{
          render: <NodeLabel />,
          foreignObjectWrapper: {
            x: -60,
            y: 1,
          },
        }}
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
