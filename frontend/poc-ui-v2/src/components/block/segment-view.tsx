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
        <SegmentStages
          type={block.type}
          subBlocks={block.blocks}
          updateBlock={updateBlock}
        />
      )
    default:
      return <span />
  }
}

const SegmentStages: React.FC<{
  type: string
  subBlocks: BlockDef[]
  updateBlock: (block: BlockDef) => void
}> = ({ type, subBlocks, updateBlock }) => {
  const addSubBlock = (block: BlockDef) => {
    subBlocks.push({ ...block, id: uuid.v4() })
    updateBlock(block)
  }

  const cardWidth = type === 'sequenceStages' ? 'col-3' : 'col-12'
  return (
    <div className="col-12">
      <DndTargetBox
        accept="block"
        greedy={false}
        onDrop={(item) => addSubBlock(item)}
      >
        <RequestBlocks blocks={subBlocks} cardClass={`${cardWidth} m-0`} />
      </DndTargetBox>
    </div>
  )
}
