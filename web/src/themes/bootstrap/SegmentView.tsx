import React, { useContext, useState } from "react"
import { BlockOrDef } from "../../models/interface"

import { SegmentCompositeStages } from "./SegmentCompositeStages"

const SegmentView: React.FC<{
  block: BlockOrDef
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
