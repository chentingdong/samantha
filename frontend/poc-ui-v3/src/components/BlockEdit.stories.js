import React from "react"
import { Store } from "../context/store"
import { BlockEdit } from "./BlockEdit"
import { ItemOrigin, EditMode } from "../models/enum";
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import { getClient } from "../index"
import { ApolloProvider } from "@apollo/client";
import blockStories from "../../data/storybook-blocks.json"

const blockLevel2 = blockStories[0]
const blockLevel1 = blockLevel2.children[0]
const blockLeaf = blockLevel1.children[0]
const blockLevel0 = { ...blockLevel1, children: [] }
const createOneBlock = ()=>{}
const updateOneBlock = ()=>{}
const close = ()=>{}
const client = getClient()

export default {
  title: "Block / BlockEdit",
  decorators: [
    (storyFn) => {
      return (
        <ApolloProvider client={client}>
          <DndProvider backend={Backend}>{storyFn()}</DndProvider>
        </ApolloProvider>
      )
    }
  ],
}

const actions = {createOneBlock, updateOneBlock}

export const Leaf = () => 
  <BlockEdit 
    blockCreateInput={blockLeaf}
    close={close}
    itemOrigin={ItemOrigin.Catalog} 
    editMode={EditMode.Create} 
    actions={actions} 
  />

export const Level0 = () => 
  <BlockEdit 
    blockCreateInput={blockLevel0}
    close={close}
    itemOrigin={ItemOrigin.Catalog} 
    editMode={EditMode.Create} 
    actions={actions} 
  />

export const Level1 = () => 
  <BlockEdit 
    blockCreateInput={blockLevel1}
    close={close}
    itemOrigin={ItemOrigin.Catalog} 
    editMode={EditMode.Create} 
    actions={actions} 
  />

export const Level2 = () => 
  <BlockEdit 
    blockCreateInput={blockLevel2}
    close={close}
    itemOrigin={ItemOrigin.Catalog} 
    editMode={EditMode.Create} 
    actions={actions} 
  />