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
        <div className="particles">{isLeaf && <Particles />}</div>
        <div className="bg-transparent">
          <SegmentView block={block} />
        </div>
      </div>
    </div>
  )
}

const Styles = styled.div.attrs({
  className: "rounded-t-md m-1",
})`
  & {
    border: 1px solid ${(props) => props.theme.highlight};
    background: ${(props) => props.theme.bg};
    .header {
      font-size: 1em;
      font-family: Georgia;
      text-transform: capitalize;
      color: ${(props) => props.theme.fg};
      &.leaf {
        background-image: linear-gradient(
          to bottom,
          ${(props) => props.theme.highlight},
          ${(props) => props.theme.shadow}
        );
      }
      &.composite {
        background-image: linear-gradient(
          to right,
          ${(props) => props.theme.highlight},
          ${(props) => props.theme.shadow}
        );
      }
    }
    .body {
      font-size: 0.9em;
      font-family: Ariel;
      color: ${(props) => props.theme.fg};
      .particles {
        background: transparent;
      }
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
