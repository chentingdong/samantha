import React, { useContext, useState } from "react"
import { BlockOrDef } from "../../models/interface"
import { SegmentCompositeStages } from "./SegmentCompositeStages"

const SegmentView: React.FC<{
  block: BlockOrDef
}> = ({ block }) => {
  switch (block.type) {
    case "ParallelAll":
    case "Sequence":
      return (
        <SegmentCompositeStages
          type={block.type}
          childrenBlocks={block.children.map(({ child }) => child)}
        />
      )
    default:
      return <span />
  }
}

export { SegmentView }
