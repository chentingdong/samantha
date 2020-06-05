import React from "react"
import { RequestItem } from "./RequestItem"
import { ItemOrigin, EditMode } from "../models/enum"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import { apolloClient } from "../index"
import { ApolloProvider } from "@apollo/client"
import blockStories from "../../data/storybook-blocks.json"
import users from "../../data/users.json"

const blockLevel2 = blockStories[0]
const blockLevel1 = blockLevel2.children[0]
const blockLeaf = blockLevel1.children[0]
const blockLevel0 = { ...blockLevel1, children: [] }
const createOneBlock = () => {}
const updateOneBlock = () => {}
const completeOneBlock = () => {}

export default {
  title: "Components / RequestItem",
  decorators: [
    (storyFn) => {
      return (
        <ApolloProvider client={apolloClient}>
          <DndProvider backend={Backend}>{storyFn()}</DndProvider>
        </ApolloProvider>
      )
    },
  ],
}

const actions = { createOneBlock, updateOneBlock, completeOneBlock }

export const Leaf = () => <RequestItem block={blockLeaf} actions={actions} />
export const Level0 = () => (
  <RequestItem block={blockLevel0} actions={actions} />
)
export const Level1 = () => (
  <RequestItem block={blockLevel1} actions={actions} />
)
export const Level2 = () => (
  <RequestItem block={blockLevel2} actions={actions} />
)
export const Level2EditMode = () => (
  <RequestItem block={blockLevel0} actions={actions} initShowEdit={true} />
)
