import React, { useContext } from 'react'
import { Block } from '../context/interface'
import { Context } from '../context/store'
import { BlockCard } from './block-card'

// BlockDef cards that dropped in requestDef editing area
export const RequestBlocks: React.FC<{
  children: Block[]
}> = ({ children }) => {
  const { state, dispatch } = useContext(Context)
  const updateOneBlock = (block) => {
    dispatch({
      type: 'set',
      data: {
        children: [...children, block],
      },
    })
  }
  return (
    <div className="container-fluid">
      <div className="row pr-3">
        {children?.map((block, index) => {
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
