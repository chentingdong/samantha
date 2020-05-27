import React from "react"
import { Block } from "../../models/interface"
import { SegmentView } from "./SegmentView"
import styled from "styled-components"
import Particles from "react-particles-js"

type BlockCatalogItemType = {
  block: Block
  index?: number
  className?: string
  onDelete?: (child: Block) => void
}

const particlesParms = {
  particles: {
    number: {
      value: 20,
      density: {
        enable: false,
      },
    },
    size: {
      value: 8,
      random: true,
    },
    move: {
      direction: "random",
      out_mode: "out",
    },
    line_linked: {
      enable: false,
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
    },
  },
}

const BlockCatalogItemContainerView: React.FC<BlockCatalogItemType> = ({
  block,
  index = 0,
  onDelete,
  className = "",
}) => {
  const isLeaf = block.type.includes("LEAF_")
  const headerClass = isLeaf ? "leaf" : "composite"
  return (
    <div className={`${className}`} key={block.id}>
      <div className={`header ${headerClass}`}>
        <div className="title">
          {index + 1} - {block.name}
        </div>
        <div className="close btn btn-light" onClick={onDelete}>
          x
        </div>
      </div>
      <div className="body">
        <p> {block.description} </p>
        <SegmentView block={block} />
        <div className="particles">
          {isLeaf && <Particles params={particlesParms} />}
        </div>
      </div>
    </div>
  )
}

const Styles = styled.div.attrs({})`
  display: block;
  margin: 1em 0;
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  border: 1px solid ${(props) => props.theme.shadow};
  .header {
    padding: 0 1em;
    padding: 0 0.5em;
    border-radius: ${(props) => props.theme.borderRadius};
    position: relative;
    font-size: 0.9em;
    &.composite {
      color: ${(props) => props.theme.bg};
      background: ${(props) => props.theme.bgComposite};
    }
    &.leaf {
      color: ${(props) => props.theme.fg};
      background: ${(props) => props.theme.bgLeaf};
      .title {
        max-width: calc(100% - 2em);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .body {
    padding: 0.5em;
    color: ${(props) => props.theme.fg};
    background: ${(props) => props.theme.bg};
  }
  .particles {
    background: rgba(0, 0, 0, 0.2);
  }
  .close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    background: none;
    text-decoration: none;
    display: inline-block;
    font-size: 1em;
    padding: 2px 5px;
  }
`

const BlockCatalogItem: React.FC<BlockCatalogItemType> = ({ ...props }) => {
  return (
    <Styles>
      <BlockCatalogItemContainerView {...props} />
    </Styles>
  )
}
export { BlockCatalogItem }
