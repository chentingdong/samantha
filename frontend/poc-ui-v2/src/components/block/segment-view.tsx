import React from 'react'
import { BlockDef } from '../context/interface'
import { DndTargetBox } from './dnd-target-box'

export const SegmentView: React.FC<{ block: BlockDef }> = ({ block }) => {
  switch (block.type) {
    case 'sequenceStages':
      return <SegmentSequenceStages stages={block.blocks} />
    case 'parallelStages':
      return <SegmentParallelStages stages={block.blocks} />
    default:
      return <span />
  }
}

const SegmentSequenceStages: React.FC<{ stages: BlockDef[] }> = ({
  stages,
}) => {
  const addBlockToStage = (subBlock: BlockDef) => {
    console.log(subBlock)
  }

  return (
    <div className="d-flex">
      {stages.map((stage) => {
        return (
          <div className="flex-fill p-2" key={stage.id}>
            <div className="text-center">{stage.name}</div>
            <DndTargetBox
              accept="block"
              onDrop={(subBlock) => addBlockToStage(subBlock)}
            >
              <div>{stage.blocks}</div>
            </DndTargetBox>
          </div>
        )
      })}
    </div>
  )
}

const SegmentParallelStages: React.FC<{ stages: BlockDef[] }> = ({
  stages,
}) => {
  return <div>Parallel stages: {JSON.stringify(stages)}</div>
}
