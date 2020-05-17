import React, { useContext, useState } from 'react'
import uuid from 'uuid'
import { DndTargetBox } from '../block/DndTargetBox'
import { BlockChildrenList } from '../blocks/BlockChildrenList'
import { Context } from '../context/store'
import { Block } from '../context/interface'

const SegmentCompositeStages: React.FC<{
  type: string
  childrenBlocks: Block[]
}> = ({ type, childrenBlocks }) => {
  const { state, dispatch } = useContext(Context)
  const [blocks, setBlocks] = useState(childrenBlocks)

  const addSubBlock = (block: Block) => {
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