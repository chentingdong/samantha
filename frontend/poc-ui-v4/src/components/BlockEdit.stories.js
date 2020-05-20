import React from "react"
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
}

const BlockEditLeaf = () => {
  return (
    <ApolloProvider client={client}>
      <DndProvider backend={Backend}>
        <BlockEdit blockCreateInput={blockLeaf} close={close}
          itemOrigin={ItemOrigin.Catalog} editMode={EditMode.Create}
          actions={{createOneBlock, updateOneBlock}} />
      </DndProvider>
    </ApolloProvider>
  )
}

const BlockEditLevel0 = () => {
  return (
    <ApolloProvider client={client}>
      <DndProvider backend={Backend}>
        <BlockEdit blockCreateInput={blockLevel0} close={close}
          itemOrigin={ItemOrigin.Catalog} editMode={EditMode.Create}
          actions={{createOneBlock, updateOneBlock}} />
      </DndProvider>
    </ApolloProvider>
  )
}

const BlockEditLevel1 = () => {
  return (
    <ApolloProvider client={client}>
      <DndProvider backend={Backend}>
        <BlockEdit blockCreateInput={blockLevel1} close={close}
          itemOrigin={ItemOrigin.Catalog} editMode={EditMode.Create}
          actions={{createOneBlock, updateOneBlock}} />
      </DndProvider>
    </ApolloProvider>
  )
}
const BlockEditLevel2 = () => {
  return (
    <ApolloProvider client={client}>
      <DndProvider backend={Backend}>
        <BlockEdit blockCreateInput={blockLevel2} close={close}
          itemOrigin={ItemOrigin.Catalog} editMode={EditMode.Create}
          actions={{createOneBlock, updateOneBlock}} />
      </DndProvider>
    </ApolloProvider>
  )
}

export { BlockEditLeaf, BlockEditLevel0, BlockEditLevel1, BlockEditLevel2 }
