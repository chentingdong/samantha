import React from 'react'
import { BlockDef } from '../context/interface'
import { DndTargetBox } from './dnd-target-box'

export const SegmentView: React.FC<{ block: BlockDef }> = ({ block }) => {
  switch (block.type) {
    case 'sequenceStage':
      return <SegmentSequenceStage stages={block.data['stages']} />
    case 'parallelStage':
      return <SegmentParallelStage stages={block.data['stages']} />
    default:
      return <></>
  }
}

const SegmentSequenceStage: React.FC<{ stages: string[] }> = ({ stages }) => {
  const addBlockToStage = (blockDef: BlockDef) {
    console.log(blockDef)
  }

  return (
    <div className="d-flex">
      {stages.map((stage) => {
        return (
          <div className="flex-fill p-2">
            <strong className="text-center">{stage}</strong>
            <DndTargetBox accept='block' onDrop={(blockDef) => addBlockToStage(blockDef)}>
            </DndTargetBox>
          </div>
        )
      })}
    </div>
  )
}

const SegmentParallelStage: React.FC<{ stages: string[] }> = ({ stages }) => {
  return <div>Parallel stages: {JSON.stringify(stages)}</div>
}
