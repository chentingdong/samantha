import React, { useState, useEffect, useRef } from "react"
import { getIconClassByType } from "../utils/Styles"
import { BlockOrDef } from "../models/interface"
import Tree from "react-d3-tree"
import styled from "styled-components"
import { Card } from "../components/Card"
import moment from "moment"
import { Icon } from "rsuite"
import { setUiState } from "../operations/mutations/setUiState"

function BellTree({ data }) {
  const treeContainer = useRef()
  const [translate, setTranslate] = useState({ x: 400, y: 30 })

  useEffect(() => {
    setTranslate({
      x: treeContainer?.current?.offsetWidth / 2,
      y: 30,
    })
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
      // showBellEditor: true,
      currentBlockId: nodeData.blockId,
    })
  }

  const NodeLabel = ({ nodeData }) => {
    // TODO: move styles to styled css
    let color
    switch (nodeData.state) {
      case "Running":
        color = "orange"
        break
      case "Success":
        color = "purple"
      default:
        color = "gray"
        break
    }
    return (
      <Card
        className={`card border text-xs bg-${color}-700`}
        style={{ width: "180px", height: "120px" }}
        onClick={(e) => onClick(nodeData)}
      >
        <div className={`card-header bg-${color}-900`}>
          <Icon icon={nodeData.icon} className="pr-1" />
          {nodeData.name}
        </div>
        <div className={`card-body bg-${color}-700`}>
          <div>
            Created at: {moment(nodeData.createdAt).format("MM/DD hh:mm:ss")}
          </div>
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
        styles={{ links: { stroke: "yellow" } }}
        zoomable={false}
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

export { BellTree }
