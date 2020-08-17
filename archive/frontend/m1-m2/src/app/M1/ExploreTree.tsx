import React from "react"
import { BlockOrDef } from "../../models/interface"
import { getIconClassByType } from "../../utils/styles"
import { Tree } from "rsuite"

function ExploreTree({ draftBlock }) {
  const getTreeData = (block: BlockOrDef) => {
    return {
      id: block.id,
      name: block.name,
      icon: getIconClassByType(block.type),
      children: Array.isArray(block.children)
        ? block.children.map?.(({ child }) => getTreeData(child))
        : [],
    }
  }

  return (
    <Tree
      data={[getTreeData(draftBlock)]}
      labelKey="name"
      valueKey="id"
      defaultExpandAll
      size="lg"
      renderTreeNode={(nodeData) => {
        return (
          <span>
            <i className={nodeData.icon} /> {nodeData.name}
          </span>
        )
      }}
    />
  )
}

export default ExploreTree
