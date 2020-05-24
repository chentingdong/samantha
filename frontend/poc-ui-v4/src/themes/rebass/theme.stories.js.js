import React from "react"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import { BlockCatalogItem } from "./BlockCatalogItem"

import blockStories from "../../../data/storybook-blocks.json"
const blockLevel2 = blockStories[0]
const blockLevel1 = blockLevel2.children[0]
const blockLeaf = blockLevel2.children[0].children[2]
import { ThemeProvider } from "emotion-theming"
import { theme } from "./theme"

export default {
  title: "Theme /Rebass + Emotion/ BlockCatalogItem",
}

const StyledSystemThemeDefault = () => {
  return (
    <ThemeProvider theme={theme}>
      <DndProvider backend={Backend}>
        <BlockCatalogItem block={blockLevel1} theme={theme} />
      </DndProvider>
    </ThemeProvider>
  )
}

export { StyledSystemThemeDefault }
