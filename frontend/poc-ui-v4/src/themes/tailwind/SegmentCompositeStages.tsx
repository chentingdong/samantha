import React, { useContext, useState } from "react"
import { Block } from "models/interface"
import { DndTargetBox } from "components/DndTargetBox"
import { Context } from "context/store"
import { BlockChildrenList } from "./BlockChildrenList"

const SegmentCompositeStages: React.FC<{
  type: string
  childrenBlocks: Block[]
}> = ({ type, childrenBlocks }) => {
  const [blocks, setBlocks] = useState(childrenBlocks)

  const addSubBlock = (block: Block) => {
    const updatedBlocks = [...blocks, block]
    setBlocks(updatedBlocks)
  }

  return (
    <DndTargetBox
      accept="block"
      greedy={false}
      onDrop={(item) => addSubBlock(item)}
    >
      <BlockChildrenList blocks={blocks} />
    </DndTargetBox>
  )
}

export { SegmentCompositeStages }
