import React from "react"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import { BlockCatalogItem } from "./BlockCatalogItem"

import blockStories from "../../../data/storybook-blocks.json"
const blockLevel2 = blockStories[0]
const blockLevel1 = blockLevel2.children[0]
const blockLeaf = blockLevel2.children[0].children[2]
import { light, dark } from "./theme"
import { ThemeProvider } from "styled-components"

export default {
  title: "Theme /Example",
}

const ExampleThemeLight = () => {
  return (
    <ThemeProvider theme={light}>
      <DndProvider backend={Backend}>
        <BlockCatalogItem block={blockLevel1} />
      </DndProvider>
    </ThemeProvider>
  )
}

const ExampleThemeDark = () => {
  return (
    <ThemeProvider theme={dark}>
      <DndProvider backend={Backend}>
        <BlockCatalogItem block={blockLevel1} />
      </DndProvider>
    </ThemeProvider>
  )
}

export { ExampleThemeLight, ExampleThemeDark }
