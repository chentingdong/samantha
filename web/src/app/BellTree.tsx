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
  const [translate, setTranslate] = useState({ x: 400, y: 20 })

  useEffect(() => {
    setTranslate({
      x: treeContainer?.current?.offsetWidth / 2,
      y: 40,
    })
  }, [treeContainer])

  const svgSquare = {
    shape: "rect",
    shapeProps: {
      width: 200,
      height: 120,
      x: -75,
      y: -30,
      fill: "white",
    },
  }

  const styles = {
    links: { stroke: "yellow" },
  }

  const getTreeData = (block: BlockOrDef) => {
    if (block === undefined) return
    return {
      bid: block.id,
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
    setUiState({
      showBlockEditor: true,
      currentBlockId: nodeData.bid,
    })
  }

  const NodeLabel = ({ nodeData }) => {
    return (
      <Card
        className={`card border text-xs bg-gray-700`}
        style={{ width: "200px", height: "120px" }}
        onClick={(e) => onClick(nodeData)}
      >
        <div className="card-header bg-gray-900">
          <Icon icon={nodeData.icon} className="pr-1" />
          {nodeData.name}
        </div>
        <div className="card-body bg-gray-700">
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
        styles={styles}
        orientation="vertical"
        transitionDuration={0}
        separation={{ siblings: 2, nonSiblings: 3 }}
        allowForeignObjects
        nodeLabelComponent={{
          render: <NodeLabel />,
          foreignObjectWrapper: {
            x: -80,
            y: -30,
          },
        }}
      />
    </div>
  )
}

export { BellTree }
