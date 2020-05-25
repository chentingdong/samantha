import React from "react"
import { Block } from "models/interface"
import { SegmentView } from "./SegmentView"
import Particles from "react-particles-js"
import styled from "styled-components"
import tw from "tailwind.macro"

type BlockCatalogItemType = {
  block: Block
  index?: number
  onDelete?: (child: Block) => void
}

const BlockCatalogItemRaw: React.FC<BlockCatalogItemType> = ({
  block,
  index = 0,
  onDelete,
}) => {
  const isLeaf = block.type.includes("LEAF_")
  const bgHeader = isLeaf ? "leaf" : "composite"
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
        <div className="bg-transparent">
          <SegmentView block={block} />
        </div>
        <div className="bg-secondary">{isLeaf && <Particles />}</div>
      </div>
    </div>
  )
}

const Styles = styled.div.attrs({
  className: "rounded-t-md m-1 shadow",
})`
  & {
    .header {
      font-size: 1em;
      text-transform: capitalize;
      color: var(--color-fg-default);
      &.leaf {
        background: var(--color-bg-primary);
      }
      &.composite {
        background: var(--color-bg-secondary);
      }
    }
    .body {
      font-size: 0.9em;
      font-family: Ariel;
      color: var(--color-fg-default);
    }
    .close {
      font-family: Symbol;
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
