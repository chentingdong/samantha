import React from "react"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import { BlockCatalogItem } from "./BlockCatalogItem"

import blockStories from "../../../data/storybook-blocks.json"
const blockLevel1 = blockStories[0].children[0]
import "./tailwind.generated.css"

export default {
  title: "Theme /Tailwind/ BlockCatalogItem",
}

const StyledSystemThemeDefault = () => {
  return (
    <DndProvider backend={Backend}>
      <BlockCatalogItem block={blockLevel1} />
    </DndProvider>
  )
}

export { StyledSystemThemeDefault }
