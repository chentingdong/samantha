import React from "react"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import { BlockCatalogItem } from "../../components/BlockCatalogItem"

import blockStories from "../../../data/storybook-blocks.json"
import { ThemeProvider } from "@material-ui/core"
const blockLevel2 = blockStories[0]
const blockLevel1 = blockLevel2.children[0]
const blockLeaf = blockLevel2.children[0].children[2]
import { theme as themeAlteredCarbon } from "./alteredCarbon"
import { theme as themeDefault } from "./default"

export default {
  title: "Theme /Material UI / BlockCatalogItem",
}

const MuiThemeDefault = () => {
  return (
    <ThemeProvider theme={themeDefault}>
      <DndProvider backend={Backend}>
        <BlockCatalogItem block={blockLevel1} theme={themeDefault} />
      </DndProvider>
    </ThemeProvider>
  )
}

const MuiThemeAlteredCarbon = () => {
  return (
    <ThemeProvider theme={themeAlteredCarbon}>
      <DndProvider backend={Backend}>
        <BlockCatalogItem block={blockLevel1} theme={themeAlteredCarbon} />
      </DndProvider>
    </ThemeProvider>
  )
}

export { MuiThemeDefault, MuiThemeAlteredCarbon }
