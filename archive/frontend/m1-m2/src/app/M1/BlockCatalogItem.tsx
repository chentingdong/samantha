import React from "react"
import { BlockDef } from "../../models/interface"
import { DndSourceBox } from "../../components/DndSourceBox"
import { Card } from "../../components/Card"
import { getIconByType } from "../../utils/styles"
import { Icon } from "rsuite"

const BlockCatalogItem: React.FC<{
  blockDef: BlockDef
}> = ({ blockDef }) => {
  return (
    <Card className="">
      <DndSourceBox type="catalogItem" block={blockDef}>
        <div className="text-sm">
          <strong className="card-header">
            <Icon icon={getIconByType(blockDef.type)} />
            <span className="ml-1">{blockDef.name}</span>
          </strong>
          <div className="card-body">{blockDef.description}</div>
        </div>
      </DndSourceBox>
    </Card>
  )
}

export { BlockCatalogItem }
