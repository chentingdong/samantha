import React, { useState, useEffect, useRef } from "react"
import { getIconClassByType } from "../../utils/styles"
import { BlockOrDef } from "../../models/interface"
import Tree from "react-d3-tree"
import { Card } from "../../components/Card"
import { Icon } from "rsuite"
import { setUiState } from "../../operations/mutations/setUiState"
import { displayDate } from "utils/common"

function BlockTree({ data }) {
  const treeContainer = useRef()
  const [translate, setTranslate] = useState({ x: 400, y: 30 })

  useEffect(() => {
    const resize = () => {
      setTranslate({
        x: window.innerWidth / 3,
        y: 30,
      })
    }
    resize()
    window.addEventListener("resize", resize)
  }, [treeContainer])

  const getTreeData = (block: BlockOrDef) => {
    if (!block) return {}
    return {
      blockId: block.id,
      name: block.name,
      createdAt: block.created_at,
      state: block.state,
      responders: block?.responders
        ?.map(({ user }) => {
          return user.name
        })
        .toString(),
      icon: getIconClassByType(block.type),
      children: Array.isArray(block.children)
        ? block.children.map?.(({ child }) => getTreeData(child))
        : [],
    }
  }

  const onClick = (nodeData) => {
    console.log(nodeData)
    setUiState({
      showBlockEditor: true,
      currentBlockId: nodeData.blockId,
    })
  }

  const NodeLabel = ({ nodeData }) => {
    return (
      <Card
        className="text-xs border card"
        style={{ width: "180px", height: "120px" }}
        onClick={(e) => onClick(nodeData)}
      >
        <div className="card-header">
          <Icon icon={nodeData.icon} className="pr-1" />
          {nodeData.name}
        </div>
        <div className="card-body">
          <div>Created at: {displayDate(nodeData.createdAt)}</div>
          <div>Responders: {nodeData.responders}</div>
          <div>State: {nodeData.state}</div>
        </div>
      </Card>
    )
  }

  return (
    <div className="w-full" style={{ height: "500px" }} ref={treeContainer}>
      <Tree
        data={getTreeData(data)}
        translate={translate}
        collapsible={false}
        nodeSvgShape={{ shape: "none" }}
        nodeSize={{ x: 250, y: 150 }}
        styles={{ links: { stroke: "var(--color-bg-primary)" } }}
        zoomable={true}
        orientation="vertical"
        transitionDuration={0}
        separation={{ siblings: 1, nonSiblings: 1 }}
        allowForeignObjects
        nodeLabelComponent={{
          render: <NodeLabel />,
          foreignObjectWrapper: {
            x: -100,
            y: -30,
          },
        }}
      />
    </div>
  )
}

export { BlockTree }
