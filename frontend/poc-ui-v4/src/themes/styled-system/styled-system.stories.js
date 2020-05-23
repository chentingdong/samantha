import React from "react"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import { BlockCatalogItem } from "../../components/BlockCatalogItem"
import { ThemeProvider, StylesProvider } from "@material-ui/core"

import blockStories from "../../../data/storybook-blocks.json"
const blockLevel2 = blockStories[0]
const blockLevel1 = blockLevel2.children[0]
const blockLeaf = blockLevel2.children[0].children[2]
import { theme as themeDefault } from "./default"

export default {
  title: "Theme /Styled system + styled component/ BlockCatalogItem",
}

const StyledSystemThemeDefault = () => {
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

export { StyledSystemThemeDefault }
