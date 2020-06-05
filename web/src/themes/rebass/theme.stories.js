import React from "react"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import { BlockCatalogItem } from "./BlockCatalogItem"

import blockStories from "../../../data/storybook-blocks.json"
const blockLevel1 = blockStories[0].children[0]
import { ThemeProvider } from "styled-components"
import { theme } from "./theme"

export default {
  title: "Theme /Rebass + Emotion/ BlockCatalogItem",
}

const StyledSystemThemeDefault = () => {
  return (
    <ThemeProvider theme={theme}>
      <DndProvider backend={Backend}>
        <BlockCatalogItem block={blockLevel1} />
      </DndProvider>
    </ThemeProvider>
  )
}

export { StyledSystemThemeDefault }
