import React from "react"
import { RequestItem } from "./RequestItem"
import blockStories from "../../data/storybook-blocks.json"
const blockLevel2 = blockStories[0]
const blockLevel1 = blockLevel2.children[0]
const blockLeaf = blockLevel1.children[0]
const blockLevel0 = { ...blockLevel1, children: [] }
const createOneBlock = () => {}
const updateOneBlock = () => {}
const completeOneBlock = () => {}

export default {
  title: "Block / RequestItem",
}

const actions = { createOneBlock, updateOneBlock, completeOneBlock }

export const Leaf = () => <RequestItem block={blockLeaf} actions={actions}/>
export const Level0 = () => <RequestItem block={blockLevel0} actions={actions}/>
export const Level1 = () => <RequestItem block={blockLevel1} actions={actions}/>
export const Level2 = () => <RequestItem block={blockLevel2} actions={actions}/>
