import React from "react"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import { BlockCatalogItem } from "./BlockCatalogItem"
import { ThemeProvider, StylesProvider } from "@material-ui/core"

import blockStories from "../../../data/storybook-blocks.json"
const blockLevel1 = blockStories[0].children[0]
import { theme as themeAlteredCarbon } from "./altered-carbon"
import { theme as themeDefault } from "./default"

export default {
  title: "Theme /Material UI + Styled Component",
}

const BlockMuiThemeDefault = () => {
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

const BlockMuiThemeAlteredCarbon = () => {
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

export { BlockMuiThemeDefault, BlockMuiThemeAlteredCarbon }
