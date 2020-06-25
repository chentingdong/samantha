import React, { useState, useEffect, useRef } from "react"
import { getIconClassByType } from "../utils/Styles"
import { BlockOrDef } from "../models/interface"
import Tree from "react-d3-tree"
import styled from "styled-components"
import { Card } from "../components/Card"
import moment from "moment"

function BellTree({ data }) {
  const treeContainer = useRef()
  const [translate, setTranslate] = useState({ x: 400, y: 20 })

  useEffect(() => {
    setTranslate({
      x: treeContainer?.current?.offsetWidth / 2,
      y: 40,
    })
  }, [treeContainer])

  const onClick = (e) => {
    console.log(e.currentTarget)
  }

  const getTreeData = (block: BlockOrDef) => {
    return {
      id: block.id,
      name: block.name,
      createdAt: block.created_at,
      state: block.state,
      responders: block?.block_responders
        ?.map((responder) => {
          return responder.user.name
        })
        .toString(),
      icon: getIconClassByType(block.type),
      children: Array.isArray(block.children)
        ? block.children.map?.((child) => getTreeData(child))
        : [],
    }
  }

  const NodeLabel = ({ nodeData }) => {
    return (
      <Card
        className={`border text-xs bg-gray`}
        style={{ width: "150px" }}
        onClick={onClick}
      >
        <div className="card-header">{nodeData.name}</div>
        <div className="card-body">
          <div>
            Created at: {moment(nodeData.createdAt).format("YYYY-MM-DD")}
          </div>
          <div>Responders: {nodeData.responders}</div>
          <div>State: {nodeData.state}</div>
        </div>
      </Card>
    )
  }

  return (
    <div className="w-full" style={{ height: "400px" }} ref={treeContainer}>
      <Tree
        data={getTreeData(data)}
        translate={translate}
        collapsible={false}
        nodeSvgShape={{ shape: "none" }}
        orientation="vertical"
        transitionDuration={0}
        circleRadius={20}
        separation={{ siblings: 1.5 }}
        allowForeignObjects
        nodeLabelComponent={{
          render: <NodeLabel />,
          foreignObjectWrapper: {
            x: -60,
            y: -30,
          },
        }}
      />
    </div>
  )
}

export { BellTree }
