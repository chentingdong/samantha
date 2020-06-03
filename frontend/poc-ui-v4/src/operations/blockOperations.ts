import React from "react"
import { Typename } from "../models/enum"
import { Notification } from "rsuite"
import cloneDeep from "lodash/cloneDeep"
import { setUiState } from "../operations/mutations/setUiState"
import uuid from "uuid"

/**
 * Recusvielyl generate new id for the nodes of block tree
 * If targetType is Block, it will also set the requestor recursively
 *
 * @param {*} root the root node of draft block tree
 * @param {*} targetType the __typename of the nodes on the output block tree
 * @param {*} requestor the requestor of the nodes on the output block tree
 * @returns the newly created output block tree
 */
const createBlock = (root, targetType, requestor) => {
  return {
    ...root,
    id: uuid.v4(),
    requestors: targetType === Typename.Block ? [requestor] : [],
    __typename: targetType,
    children: root.children.map((child) =>
      createBlock(child, targetType, requestor)
    ),
  }
}

const findBlock = (root, target) => {
  if (root.id === target.id) return root
  let found
  for (const child of root.children) {
    found = findBlock(child, target)
    if (found) return found
  }
  return null
}

/**
 * Recursively clone the childBlock as the BlockDef, add the new clone tree as a child node of the parentBlock on this root tree
 * If targetType is Block, it will also set the requestor recursively
 * @param {*} root the root node of draft block tree
 * @param {*} childBlock the blockDef to be cloned and added as a child
 * @param {*} parentBlock the node where the child will be added
 * @param {*} requestor the requestor of the nodes on the child block tree
 */
const addOneBlock = (root, childBlock, parentBlock, requestor) => {
  Notification.info({
    title: "adding a block",
    description: `from ${childBlock.__typename} "${childBlock.name}" to ${parentBlock.__typename} "${parentBlock.name}"`,
  })
  const newDraftBlock = cloneDeep(root)
  const newParent = findBlock(newDraftBlock, parentBlock)
  newParent.children = [...newParent.children, childBlock]
  setUiState({
    draftBlock: createBlock(newDraftBlock, parentBlock.__typename, requestor),
  })
}

/**
 * delete childBlock from parentBlock on the root tree
 *
 * @param {*} root the root node of draft block tree
 * @param {*} childBlock the child node to be deleted
 * @param {*} parentBlock the node where the child will be deleted
 */
const deleteOneBlock = (root, childBlock, parentBlock) => {
  Notification.info({
    title: "deleting a block",
    description: `"${childBlock.name}" from parent "${parentBlock.name}"`,
  })
  const newDraftBlock = cloneDeep(root)
  const newParent = findBlock(newDraftBlock, parentBlock)
  newParent.children.splice(
    newParent.children.findIndex((child) => child.id === childBlock.id),
    1
  )
  setUiState({ draftBlock: newDraftBlock })
}

export { addOneBlock, deleteOneBlock, createBlock }
