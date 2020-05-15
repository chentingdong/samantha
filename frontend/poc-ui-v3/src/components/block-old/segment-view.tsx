import uuid from 'uuid'
import React, { useContext } from 'react'
import { BlockDef } from '../context/interface'
import { DndTargetBox } from './dnd-target-box'
import { RequestBlocks } from './request-blocks'
import { Context } from '../context/store'

export const SegmentView: React.FC<{
  block: BlockDef
  updateBlock: (block: BlockDef) => void
}> = ({ block, updateBlock }) => {
  switch (block.type) {
    case 'sequenceStages':
    case 'parallelStages':
      return (
        <SegmentCompositeStages
          type={block.type}
          subBlocks={block.children}
          updateBlock={updateBlock}
        />
      )
    default:
      return <span />
  }
}

const SegmentCompositeStages: React.FC<{
  type: string
  subBlocks: BlockDef[]
  updateBlock: (block: BlockDef) => void
}> = ({ type, subBlocks, updateBlock }) => {
  const { state, dispatch } = useContext(Context)

  const addSubBlock = (block: BlockDef) => {
    subBlocks.push({ ...block, id: uuid.v4() })
    updateBlock(block)
    resetPalette()
  }
  // TODO: temp solution by resetting all
  const resetPalette = () => {
    state.blockDefs.forEach((blockDef) => {
      blockDef.children = []
    })
  }

  return (
    <div className="col-12">
      <DndTargetBox
        accept="block"
        greedy={false}
        onDrop={(item) => addSubBlock(item)}
      >
        <RequestBlocks children={subBlocks} />
      </DndTargetBox>
    </div>
  )
}
