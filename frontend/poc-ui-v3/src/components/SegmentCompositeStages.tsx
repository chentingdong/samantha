import React, { useState } from "react"
import { BlockChildrenList } from "./BlockChildrenList"
import { BlockOrDef } from "../models/interface"

const SegmentCompositeStages: React.FC<{
  type: string
  childrenBlocks: BlockOrDef[]
}> = ({ type, childrenBlocks }) => {
  const [blocks, setBlocks] = useState(childrenBlocks)

  const addSubBlock = (block: BlockOrDef) => {
    const updatedBlocks = [...blocks, block]
    setBlocks(updatedBlocks)
    resetPalette()
  }
  // TODO: temp solution by resetting all
  const resetPalette = () => {
    blocks.forEach((block) => {
      block.children = []
    })
  }

  return <BlockChildrenList blocks={blocks} addSubBlock={addSubBlock} />
}

export { SegmentCompositeStages }
