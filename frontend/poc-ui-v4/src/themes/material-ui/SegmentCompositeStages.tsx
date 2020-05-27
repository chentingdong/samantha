import React, { useContext, useState } from "react"
import { BlockOrDef } from "../../models/interface"
import { DndTargetBox } from "../../components/DndTargetBox"
import { Context } from "../../context/store"
import { BlockChildrenList } from "./BlockChildrenList"

const SegmentCompositeStages: React.FC<{
  type: string
  childrenBlocks: BlockOrDef[]
}> = ({ type, childrenBlocks }) => {
  const { state, dispatch } = useContext(Context)
  const [blocks, setBlocks] = useState(childrenBlocks)

  const addSubBlock = (block: BlockOrDef) => {
    const updatedBlocks = [...blocks, block]
    setBlocks(updatedBlocks)
  }

  return (
    <div className="">
      <DndTargetBox
        accept="block"
        greedy={false}
        onDrop={(item) => addSubBlock(item)}
      >
        <BlockChildrenList blocks={blocks} />
      </DndTargetBox>
    </div>
  )
}

export { SegmentCompositeStages }
