import React from "react"
import { Block } from "models/interface"
import { SegmentView } from "./SegmentView"
import styled from "styled-components"
import tw from "tailwind.macro"

type BlockCatalogItemType = {
  block: Block
  index?: number
  className?: string
  onDelete?: (child: Block) => void
}

const BlockCatalogItemRaw: React.FC<BlockCatalogItemType> = ({
  block,
  index = 0,
  onDelete,
  className = "",
}) => {
  className = `${className} border rounded-t-md m-1`
  const isLeaf = block.type.includes("LEAF_")
  const bgHeader = isLeaf ? "bg-header-leaf" : "bg-header-composite"
  return (
    <div key={block.id}>
      <div className={`header relative px-2 py-1 rounded-t-md ${bgHeader}`}>
        <div className="title overflow-hidden">
          {index + 1} - {block.name}
        </div>
        <div
          className="close absolute top-0 right-0 mx-2 my-0 cursor-pointer"
          onClick={onDelete}
        >
          x
        </div>
      </div>
      <div className="body m-1">
        <p> {block.description} </p>
        <SegmentView block={block} />
      </div>
    </div>
  )
}

const Styles = styled.div.attrs({
  className: "bg-gray-100",
})`
  & {
    .header {
      font-size: 1em;
    }
    .body {
      font-size: 0.9em;
    }
  }
`

const BlockCatalogItem: React.FC<BlockCatalogItemType> = ({ ...props }) => {
  return (
    <Styles>
      <BlockCatalogItemRaw {...props} />
    </Styles>
  )
}
export { BlockCatalogItem }
