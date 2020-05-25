import React, { useState } from "react"
import SortableTree from "react-sortable-tree"
import "react-sortable-tree/style.css"

const Tree = () => {
  const [treeData, setTreeData] = useState([
    {
      title: "Request 1",
      children: [
        {
          title: "Block 1",
          children: [{ title: "Block 4" }],
        },
        {
          title: "Block 2",
        },
      ],
    },
    {
      title: "Request 2",
      children: [
        {
          title: "Block 3",
        },
      ],
    },
  ])

  return (
    <div style={{ height: "400px" }}>
      <SortableTree
        treeData={treeData}
        onChange={(treeData) => setTreeData(treeData)}
      />
    </div>
  )
}

export { Tree }
