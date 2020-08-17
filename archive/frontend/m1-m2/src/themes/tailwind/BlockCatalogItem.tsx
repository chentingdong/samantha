import React from "react"
import { BlockOrDef } from "../../models/interface"
import { SegmentView } from "./SegmentView"
import styled from "styled-components"
import tw from "tailwind.macro"
import { CloseCircleOutlined } from "@ant-design/icons"

type BlockCatalogItemType = {
  block: BlockOrDef
  index?: number
  onDelete?: (child: BlockOrDef) => void
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
      <div className={`header ${bgHeader}`}>
        <div className="title">
          {index + 1} - {block.name}
        </div>
        <CloseCircleOutlined
          className="close"
          onClick={() => onDelete(block)}
        />
      </div>
      <div className="body">
        <p> {block.description} </p>
        <div className="bg-transparent">
          <SegmentView block={block} />
        </div>
      </div>
    </div>
  )
}

// TODO: theme('color.blue.200') doesn't work?
const Styles = styled.div.attrs({
  className: "rounded-t-md",
})`
  & {
    background: var(--color-bg-default);
    .header {
      ${tw`relative px-2 py-1 rounded-t-md `}
      font-size: 1em;
      text-transform: capitalize;
      color: var(--color-text-default);
      &.leaf {
        background: var(--color-bg-primary);
      }
      &.composite {
        background: var(--color-bg-secondary);
      }
      .title {
        overflow: hidden;
        white-space: nowrap;
      }
      .close {
        font-family: Symbol;
        font-size: 1rem;
        ${tw`absolute top-0 right-0 m-1 cursor-pointer`}
      }
    }
    .body {
      ${tw`m-1 relative`}
      font-size: 0.9em;
      font-family: Ariel;
      color: var(--color-text-default);
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
