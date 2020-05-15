import React, { useContext, useState } from 'react'
import uuid from 'uuid'
import { DndTargetBox } from '../block/DndTargetBox'
import { BlockChildrenList } from '../blocks/BlockChildrenList'
import { Context } from '../context/store'
import { Block } from '../context/interface'

const SegmentCompositeStages: React.FC<{
  type: string
  children: Block[]
}> = ({ type, children }) => {
  const { state, dispatch } = useContext(Context)
  const [blocks, setBlocks] = useState(children)

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
    <div className="col-12">
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