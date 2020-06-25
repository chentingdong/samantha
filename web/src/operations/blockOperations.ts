import React from "react"
import { Typename } from "../models/enum"
import { Notification } from "rsuite"
import cloneDeep from "lodash/cloneDeep"
import { setUiState } from "../operations/mutations/setUiState"
import { nanoid } from "nanoid"
import { transformBlockInput } from "./transform"

/**
 * Recursively generate new id for the nodes of block tree
 * If targetType is Block, it will also set the requestor recursively
 *
 * @param {*} root the root node of draft block tree
 * @param {*} targetType the __typename of the nodes on the output block tree
 * @param {*} requestor the requestor of the nodes on the output block tree
 * @returns the newly created output block tree
 */
const createBlock = (root, targetType, requestor, parent = null) => {
  const id = nanoid()

  return {
    ...root,
    id,
    parent,
    state: targetType === Typename.blocks ? "Created" : "Draft",
    requestors:
      targetType === Typename.blocks
        ? [{ user_id: requestor.id, block_id: id, user: requestor }]
        : [],
    created_at: new Date(),
    last_updated: new Date(),
    __typename: targetType,
    children: root.children?.map((child) =>
      createBlock(child, targetType, requestor, {
        __typename: root.__typename,
        id,
        name: root.name,
        type: root.type,
      })
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
 * @param {*} syncRemote whether keep remote state in sync by running GraphQL mutations
 */
const addOneBlock = (
  root,
  childBlock,
  parentBlock,
  requestor,
  syncRemote = false,
  createFn = ({}) => null
) => {
  if (childBlock.__typename !== Typename.blockDefs) {
    Notification.warning({
      title: "error adding a block",
      description: `from ${childBlock.__typename} "${childBlock.name}" to ${parentBlock.__typename} "${parentBlock.name}"`,
    })
    return
  }
  Notification.info({
    title: "adding a block",
    description: `from ${childBlock.__typename} "${childBlock.name}" to ${parentBlock.__typename} "${parentBlock.name}"`,
  })
  const newDraftBlock = cloneDeep(root)
  const newParent = findBlock(newDraftBlock, parentBlock)
  const newChildBlock = createBlock(
    childBlock,
    parentBlock.__typename,
    requestor,
    {
      __typename: newParent.__typename,
      id: newParent.id,
      name: newParent.name,
      type: newParent.type,
    }
  )
  newParent.children = [
    ...newParent.children,
    {
      ...newChildBlock,
    },
  ]
  setUiState({
    draftBlock: newDraftBlock,
  })
  if (syncRemote) {
    // save the newDraftBlock, connect parent to newParent
    createFn({
      variables: {
        data: {
          ...transformBlockInput(newChildBlock),
          parent: { connect: { id: newParent.id } },
        },
      },
    })
  }
}

/**
 * delete childBlock from parentBlock on the root tree
 *
 * @param {*} root the root node of draft block tree
 * @param {*} childBlock the child node to be deleted
 * @param {*} parentBlock the node where the child will be deleted
 * @param {*} syncRemote whether keep remote state in sync by running GraphQL mutations
 */
const deleteOneBlock = (
  root,
  childBlock,
  parentBlock,
  syncRemote,
  deleteFn = ({}) => null
) => {
  Notification.info({
    title: "deleting a block",
    description: `${childBlock.__typename} "${childBlock.name}" from parent "${parentBlock.name}"`,
  })
  const newDraftBlock = cloneDeep(root)
  const newParent = findBlock(newDraftBlock, parentBlock)
  newParent.children.splice(
    newParent.children.findIndex((child) => child.id === childBlock.id),
    1
  )
  setUiState({ draftBlock: newDraftBlock })
  if (syncRemote) {
    const deleteFnRecursive = (block) => {
      block.children?.map((child) => deleteFnRecursive(child))
      deleteFn({
        variables: {
          id: block.id,
        },
      })
    }
    deleteFnRecursive(childBlock)
  }
}

/**
 * move the subtree on childBlock from the old parent to a new parent on the root tree
 *
 * @param {*} root the root node of draft block tree
 * @param {*} childBlock the child node to be moved
 * @param {*} parent the new parent node where the child will be moved to
 * @param {*} syncRemote whether keep remote state in sync by running GraphQL mutations
 */
const moveOneBlock = (root, childBlock, parent, syncRemote) => {
  const newDraftBlock = cloneDeep(root)
  const oldParent = findBlock(newDraftBlock, childBlock.parent)
  const newParent = findBlock(newDraftBlock, parent)

  oldParent.children.splice(
    oldParent.children.findIndex((child) => child.id === childBlock.id),
    1
  )
  newParent.children = [
    ...newParent.children,
    {
      ...childBlock,
      parent: {
        __typename: newParent.__typename,
        id: newParent.id,
        name: newParent.name,
        type: newParent.type,
      },
      last_updated: new Date(),
    },
  ]
  setUiState({ draftBlock: newDraftBlock })
  Notification.info({
    title: `moving a subtree`,
    description: `${childBlock.__typename} "${childBlock.name}" from old parent "${childBlock.parent.name}" to new parent "${parent.name}"`,
  })
}

export { addOneBlock, deleteOneBlock, createBlock, moveOneBlock }
