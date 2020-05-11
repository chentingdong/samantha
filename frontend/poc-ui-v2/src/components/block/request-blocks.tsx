import React, { useContext } from 'react'
import { BlockDef } from '../context/interface'
import { Context } from '../context/store'
import { BlockCard } from './block-card'

// BlockDef cards that dropped in requestDef editing area
export const RequestBlocks: React.FC<{
  blocks: BlockDef[]
}> = ({ blocks }) => {
  const { state, dispatch } = useContext(Context)
  const updateOneBlock = (block) => {
    dispatch({
      type: 'set',
      data: {
        blocks: [...blocks, block],
      },
    })
  }
  return (
    <div className="container-fluid">
      <div className="row pr-3">
        {blocks?.map((block, index) => {
          return (
            <BlockCard
              key={block.id}
              block={block}
              index={index}
              updateOneBlock={updateOneBlock}
            />
          )
        })}
      </div>
    </div>
  )
}
