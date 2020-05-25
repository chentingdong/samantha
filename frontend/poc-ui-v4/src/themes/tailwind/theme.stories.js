import React, { useState, Fragment } from "react"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import { BlockCatalogItem } from "./BlockCatalogItem"
import "./tailwind.generated.css"
import "./tailwind.css"
import Rating from "react-rating"
import blockStories from "../../../data/storybook-blocks.json"
import { Tree } from "./Tree"
import { Tag } from "./Tag"
import Progress from "react-progressbar"
import { StepperDemo } from "./StepperDemo"
import { IconsDemo } from "./IconsDemo"

const blockLevel1 = blockStories[0].children[0]
export default {
  title: "Theme /Tailwind/ BlockCatalogItem",
}

const DndBlocks = () => {
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

const ThemeComponents = () => {
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
        <Tag />
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
        <h2>tree view</h2>
        <Tree />
      </div>
    </div>
  )
}
export { DndBlocks, ThemeComponents }
