import React from "react"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import { BlockCatalogItem } from "./BlockCatalogItem"
import { light, dark } from "./theme"
import "./tailwind.generated.css"
import "./tailwind.css"
import { ThemeProvider } from "styled-components"

import blockStories from "../../../data/storybook-blocks.json"
const blockLevel1 = blockStories[0].children[0]

export default {
  title: "Theme /Tailwind/ BlockCatalogItem",
}

const ThemeMix = () => {
  return (
    <>
      <div className="theme-startup my-4">
        <DndProvider backend={Backend}>
          <BlockCatalogItem block={blockLevel1} />
        </DndProvider>
      </div>
      <div className="theme-boring my-4">
        <DndProvider backend={Backend}>
          <BlockCatalogItem block={blockLevel1} />
        </DndProvider>
      </div>
      <div className="theme-elegant my-4">
        <DndProvider backend={Backend}>
          <BlockCatalogItem block={blockLevel1} />
        </DndProvider>
      </div>
    </>
  )
}
export { ThemeMix }
