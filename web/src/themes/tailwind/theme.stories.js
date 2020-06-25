import React, { useState, Fragment } from "react"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import { BlockCatalogItem } from "./BlockCatalogItem"
import Rating from "react-rating"
import blockStories from "../../../data/storybook-blocks.json"
import Progress from "react-progressbar"
import { Tree } from "./Tree"
import { TagPicker } from "../../components/TagPicker"
import { StepperDemo } from "./StepperDemo"
import { IconsDemo } from "./IconsDemo"
import { TimelineDemo } from "./TimelineDemo"
import FileExplorerTheme from "react-sortable-tree-theme-file-explorer"
import { Rate, Icon } from "rsuite"
import "rsuite/dist/styles/rsuite-default.css"
import "antd/dist/antd.css"
// import "../dist/tailwind/tailwind.generated.css"

const blockLevel1 = blockStories[0].children[0]
export default {
  title: "Theme /Tailwind/ BlockCatalogItem",
}

const DndBlocks = () => {
  return (
    <>
      <div className="theme-elegant my-4">
        <DndProvider backend={Backend}>
          <BlockCatalogItem block={blockLevel1} />
        </DndProvider>
      </div>
      <div className="theme-boring my-4">
        <DndProvider backend={Backend}>
          <BlockCatalogItem block={blockLevel1} />
        </DndProvider>
      </div>
      <div className="theme-dark my-4">
        <DndProvider backend={Backend}>
          <BlockCatalogItem block={blockLevel1} />
        </DndProvider>
      </div>
    </>
  )
}

const Components = () => {
  const tags = [{ label: "a", value: "aa" }]
  const options = [
    { label: "a", value: "aa" },
    { label: "b", value: "bb" },
  ]

  return (
    <div>
      <h1>
        The following stories uses react component rather than css framework
        components{" "}
      </h1>
      <div className="my-4 ">
        <h2>Rating</h2>
        <Rating />
      </div>
      <div className="my-4 ">
        <h2>Icons</h2>
        <IconsDemo />
      </div>
      <div className="my-4">
        <h1>Multiple select</h1>
        <select multiple className="w-25 border">
          <option>1</option>
          <option>2</option>
        </select>
      </div>
      <div className="my-4 ">
        <h2>Tag View</h2>
        <TagPicker value={tags} options={options} />
      </div>
      <div className="my-4 ">
        <h2>Progress Bar </h2>
        <Progress completed={75} />
      </div>
      <div className="my-4 ">
        <h2>Stepper</h2>
        <StepperDemo />
      </div>
      <div className="my-4 ">
        <h2>tree view default theme</h2>
        <Tree />
      </div>
      <div className="my-4 ">
        <h2>tree view file expolorer theme</h2>
        <Tree theme={FileExplorerTheme} />
      </div>
    </div>
  )
}

const RSuite = () => {
  return (
    <div className="my-4 ">
      <h1>Some RSuite components</h1>
      <h2>timeline</h2>
      <TimelineDemo />
      <h2>Rate</h2>
      <Rate defaultValue={3.5} color="red" />
      <Rate
        defaultValue={4.5}
        allowHalf
        vertical
        character={<Icon icon="beer" />}
        color="var(--color-bg-primary)"
      />
    </div>
  )
}
export { DndBlocks, Components, RSuite }
