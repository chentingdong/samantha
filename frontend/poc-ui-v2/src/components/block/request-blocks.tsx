import React, { useContext } from 'react'
import { BlockDef } from '../context/interface'
import { Context } from '../context/store'
import { BlockCard } from './block-card'

// BlockDef cards that dropped in requestDef editing area
export const RequestBlocks: React.FC<{
  blocks: BlockDef[]
  cardClass?: string
}> = ({ blocks, cardClass = 'col-4' }) => {
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
    <div className="container">
      <div className="row">
        {blocks?.map((block, index) => {
          return (
            <BlockCard
              key={block.id}
              block={block}
              cardClass=""
              index={index}
              updateOneBlock={updateOneBlock}
            />
          )
        })}
      </div>
    </div>
  )
}
