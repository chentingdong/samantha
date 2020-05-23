import React from "react"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import { BlockCatalogItem } from "./BlockCatalogItem"
import { ThemeProvider, StylesProvider } from "@material-ui/core"

import blockStories from "../../../data/storybook-blocks.json"
const blockLevel2 = blockStories[0]
const blockLevel1 = blockLevel2.children[0]
const blockLeaf = blockLevel2.children[0].children[2]
import { theme as themeAlteredCarbon } from "./altered-carbon"
import { theme as themeDefault } from "./default"

export default {
  title: "Theme /Material UI + styled/ BlockCatalogItem",
}

const MuiThemeDefault = () => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={themeDefault}>
        <DndProvider backend={Backend}>
          <BlockCatalogItem block={blockLevel1} theme={themeDefault} />
        </DndProvider>
      </ThemeProvider>
    </StylesProvider>
  )
}

const MuiThemeAlteredCarbon = () => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={themeAlteredCarbon}>
        <DndProvider backend={Backend}>
          <BlockCatalogItem block={blockLevel1} theme={themeAlteredCarbon} />
        </DndProvider>
      </ThemeProvider>
    </StylesProvider>
  )
}

export { MuiThemeDefault, MuiThemeAlteredCarbon }
