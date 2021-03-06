import React, { useState, useEffect, useRef } from "react"
import { getIconClassByType } from "../../utils/styles"
import { BlockOrDef } from "../../models/interface"
import Tree from "react-d3-tree"
import { Card } from "../../components/Card"
import { displayDate } from "utils/common"
import { Icon } from "rsuite"
import { setUiState } from "../../operations/mutations/setUiState"
import { useSubscription } from "@apollo/client"
import { GET_BLOCK_M1 } from "../../operations/subscriptions/getBlock"
import { statusMap } from "components/StateBar"
import styled from "styled-components"

const BellTreeRaw = ({ bell }) => {
  const rootBlockId = bell?.block?.id
  const { data, loading } = useSubscription(GET_BLOCK_M1, {
    variables: { id: rootBlockId },
  })

  const [translate, setTranslate] = useState({ x: 400, y: 30 })
  const treeContainer = useRef()
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

  if (loading) return <>Loading...</>

  const getTreeData = (block: BlockOrDef) => {
    return {
      blockId: block?.id,
      name: block?.name,
      createdAt: block.created_at,
      state: block.state,
      responders: block?.responders
        ?.map(({ user }) => {
          return user.name
        })
        .toString(),
      icon: getIconClassByType(block.type),
      children: Array.isArray(block?.children)
        ? block?.children.map?.(({ child }) => getTreeData(child))
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
    const color = statusMap[nodeData.state] || "orange"

    return (
      <Card
        className="shadow card"
        style={{ width: "180px", height: "130px" }}
        onClick={() => onClick(nodeData)}
      >
        <div className={`card-header bg-${color}`}>
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
    data && (
      <div className="w-full" style={{ height: "500px" }} ref={treeContainer}>
        <Tree
          data={getTreeData(data.blocks_by_pk)}
          translate={translate}
          collapsible={false}
          nodeSvgShape={{ shape: "none" }}
          nodeSize={{ x: 250, y: 170 }}
          styles={{ links: { stroke: "blue" } }}
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
  )
}

const BellTree = styled(BellTreeRaw)`
  foreignObject {
    overflow: visible;
  }
`

export { BellTree }
