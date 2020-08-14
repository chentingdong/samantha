import { Block, BlockTypeMap } from "../../types"
import Goal from "./Goal"
import Task from "./Task"
import BellExecutor from "./BellExecutor"
import APIExecutor from "./APIExecutor"
import Notification from "./Notification"

const blockTypeMap: BlockTypeMap = {
  Goal,
  Task,
  BellExecutor,
  APIExecutor,
  Notification,
}

export const onRun = async (block: Block) => {
  const blockType = blockTypeMap[block.type]
  if (!blockType) {
    console.log(`Block type ${block.type} doesn't have onRun().`)
    return
  }
  await blockType.onRun(block)
}

export const onChildStateChange = async (block: Block, child: Block) => {
  const blockType = blockTypeMap[block.type]
  if (!blockType) {
    console.log(`Block type ${block.type} doesn't have onChildStateChange()`)
    return
  }
  await blockType.onChildStateChange(block, child)
}
