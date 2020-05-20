import React, { useContext, useState } from "react"
import { Block } from "../models/interface"

import { SegmentCompositeStages } from "./SegmentCompositeStages"

const SegmentView: React.FC<{
  block: Block,
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
