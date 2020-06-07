import React from "react"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import { BlockCatalogItem } from "./BlockCatalogItem"

import blockStories from "../../../data/storybook-blocks.json"
const blockLevel1 = blockStories[0].children[0]
import { light, dark } from "./theme"
import { ThemeProvider } from "styled-components"
import "../../assets/styles/bootstrap-wrapper.scss"

export default {
  title: "Theme /Bootstrap",
}

const ThemeLight = () => {
  return (
    <ThemeProvider theme={light}>
      <DndProvider backend={Backend}>
        <BlockCatalogItem block={blockLevel1} />
      </DndProvider>
    </ThemeProvider>
  )
}

const ThemeDark = () => {
  return (
    <ThemeProvider theme={dark}>
      <DndProvider backend={Backend}>
        <BlockCatalogItem block={blockLevel1} />
      </DndProvider>
    </ThemeProvider>
  )
}

export { ThemeLight, ThemeDark }
