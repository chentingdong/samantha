import React from "react"
import { Block } from "models/interface"
import { SegmentView } from "./SegmentView"
import styled from "styled-components"
import tw from "tailwind.macro"
import Particles from "react-particles-js"

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
          className="close absolute top-0 right-0 mx-2 my-1 cursor-pointer"
          onClick={onDelete}
        >
          x
        </div>
      </div>
      <div className="body m-1 relative">
        <p> {block.description} </p>
        <div className="bg-gray-400">{isLeaf && <Particles />}</div>
        <div className="bg-transparent">
          <SegmentView block={block} />
        </div>
      </div>
    </div>
  )
}

const Styles = styled.div.attrs({
  className: "bg-transparent",
})`
  & {
    .header {
      font-size: 1em;
      font-family: Georgia;
      text-transform: capitalize;
    }
    .body {
      font-size: 0.9em;
      font-family: Ariel;
    }
    .close {
      font-family: Ariel;
      font-size: 1rem;
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
