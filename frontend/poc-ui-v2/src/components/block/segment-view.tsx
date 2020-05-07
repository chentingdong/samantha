import uuid from 'uuid'
import React, { useContext } from 'react'
import { BlockDef } from '../context/interface'
import { DndTargetBox } from './dnd-target-box'
import { RequestBlocks } from './request-blocks'
import { Context } from '../context/store'

export const SegmentView: React.FC<{ block: BlockDef }> = ({ block }) => {
  switch (block.type) {
    case 'sequenceStages':
      return <SegmentSequenceStages subBlocks={block.blocks} />
    case 'parallelStages':
    // return <SegmentParallelStages subBlocks={block.blocks} />
    default:
      return <span />
  }
}

const SegmentSequenceStages: React.FC<{ subBlocks: BlockDef[] }> = ({
  subBlocks,
}) => {
  const { state, dispatch } = useContext(Context)

  const addSubBlock = (blockDef: BlockDef) => {
    subBlocks.push({ ...blockDef, id: uuid.v4() })
    dispatch({
      type: 'set',
      data: {
        currentRequestDef: {
          ...state.currentRequestDef,
          blocks: state.currentRequestDef.blocks,
        },
      },
    })
  }

  return (
    <div className="col-12">
      <DndTargetBox
        accept="block"
        greedy={false}
        onDrop={(item) => addSubBlock(item)}
      >
        <RequestBlocks blocks={subBlocks} />
      </DndTargetBox>
    </div>
  )
}

// const SegmentParallelStages: React.FC<{ stages: BlockDef[] }> = ({
//   stages,
// }) => {
//   return <div>Parallel stages: {JSON.stringify(stages)}</div>
// }
