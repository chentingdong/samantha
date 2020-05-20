import React from "react"
import { RequestItem } from "./RequestItem"
import blockStories from "../../data/storybook-blocks.json"
const blockLevel2 = blockStories[0]
const blockLevel1 = blockLevel2.children[0]
const blockLeaf = blockLevel1.children[0]
const blockLevel0 = { ...blockLevel1, children: [] }
const createOneBlock = ()=>{}
const updateOneBlock = ()=>{}
const completeOneBlock = ()=>{}

export default {
  title: "Block / RequestItem",
}

const RequestCatalogItemLeaf = () => {
  return (
    <RequestItem block={blockLeaf} 
      actions={{createOneBlock, updateOneBlock, completeOneBlock}} />
  )
}

const RequestCatalogItemLevel0 = () => {
  return (
    <RequestItem block={blockLevel0} 
      actions={{createOneBlock, updateOneBlock, completeOneBlock}} />
  )
}

const RequestCatalogItemLevel1 = () => {
  return (
    <RequestItem block={blockLevel1} 
      actions={{createOneBlock, updateOneBlock, completeOneBlock}} />
  )
}
const RequestCatalogItemLevel2 = () => {
  return (
    <RequestItem block={blockLevel2} 
      actions={{createOneBlock, updateOneBlock, completeOneBlock}} />
  )
}

export { RequestCatalogItemLeaf, RequestCatalogItemLevel0, RequestCatalogItemLevel1, RequestCatalogItemLevel2 }
