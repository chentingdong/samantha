import React, { useContext, useState } from "react"
import { Block, BlockDef } from "../models/interface"

import { SegmentCompositeStages } from "./SegmentCompositeStages"

const SegmentView: React.FC<{
  block: Block | BlockDef
}> = ({ block }) => {
  switch (block.type) {
    case "COMPOSITE_PARALLEL":
    case "COMPOSITE_SEQUENTIAL":
      return (
        <SegmentCompositeStages
          type={block.type}
          childrenBlocks={block.children}
        />
      )
    default:
      return <span />
  }
}

export { SegmentView }
