import React from "react"
import { Block } from "models/interface"
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
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#999",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: "bell.png",
        width: 10,
        height: 10,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 10,
      random: true,
      anim: {
        enable: false,
        speed: 80,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 300,
      color: "#ffffff",
      opacity: 0.4,
      width: 2,
    },
    move: {
      enable: true,
      speed: 12,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false,
        mode: "repulse",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 800,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 800,
        size: 80,
        duration: 2,
        opacity: 0.8,
        speed: 3,
      },
      repulse: {
        distance: 400,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
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
