import React from "react"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import blockStories from "../../../data/storybook-blocks.json"
const blockLevel1 = blockStories[0].children[0]
import { ThemeProvider } from "styled-components"
import { RequestTree } from "./RequestTree"
import { FormBuilderDemo } from "./FormBuilderDemo"

export default {
  title: "Theme / Random",
}

const RequestTreeD3 = () => {
  return (
    <DndProvider backend={Backend}>
      <RequestTree block={blockLevel1} />
    </DndProvider>
  )
}

const FormBuilder = () => {
  return (
    <div className="theme-dark my-4">
      <DndProvider backend={Backend}>
        <FormBuilderDemo />
      </DndProvider>
    </div>
  )
}
export { RequestTreeD3, FormBuilder }
