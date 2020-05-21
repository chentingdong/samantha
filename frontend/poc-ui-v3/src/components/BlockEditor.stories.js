import React from "react"
import { Store } from "../context/store"
import { BlockEditor } from "./BlockEditor"
import { ItemOrigin, EditMode } from "../models/enum"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import { apolloClient } from "../index"
import { ApolloProvider } from "@apollo/client"
import { Context } from "../context/store"
import blockStories from "../../data/storybook-blocks.json"
import users from "../../data/users.json"

const blockLevel2 = blockStories[0]
const blockLevel1 = blockLevel2.children[0]
const blockLeaf = blockLevel1.children[0]
const blockLevel0 = { ...blockLevel1, children: [] }
const createOneBlock = () => {}
const updateOneBlock = () => {}
const close = () => {}

export default {
  title: "Components / BlockEditor",
  decorators: [
    (storyFn) => {
      return (
        <Context.Provider value={{ state: { users } }}>
          <ApolloProvider client={apolloClient}>
            <DndProvider backend={Backend}>{storyFn()}</DndProvider>
          </ApolloProvider>
        </Context.Provider>
      )
    },
  ],
}

const actions = { createOneBlock, updateOneBlock }

export const catalogItemEditor = () => (
  <BlockEditor
    blockCreateInput={blockLevel2}
    close={close}
    actions={actions}
    editMode={EditMode.Edit}
    itemOrigin={ItemOrigin.Catalog}
  />
)

export const requestItemEditor = () => (
  <BlockEditor
    blockCreateInput={blockLevel2}
    close={close}
    actions={actions}
    editMode={EditMode.Edit}
    itemOrigin={ItemOrigin.Made}
  />
)
