import { Block, BlockTypeMap, BlockState } from "../types"
import Goal from "./Goal"
import Task from "./Task"
import BellExecutor from "./BellExecutor"
import APIExecutor from "./APIExecutor"
import Notification from "./Notification"
import { evalBlockPreConditions } from "./PreConditions"
import invariant from "invariant"

const blockTypeMap: BlockTypeMap = {
  Goal,
  Task,
  BellExecutor,
  APIExecutor,
  Notification,
}

export const onRun = async (block: Block) => {
  console.log(`onRun: block: ${block.id} ${block.state}`)
  const preCondResult = evalBlockPreConditions(block)
  console.log("preCondition result: ", preCondResult)

  const blockType = blockTypeMap[block.type]
  if (!blockType) {
    console.log(`Block type ${block.type} doesn't have onRun().`)
    return
  }
  await blockType.onRun(block, preCondResult)
}

export const onChildStateChange = async (block: Block, child: Block) => {
  console.log(
    `onChildStateChange: block: ${block.id} ${block.state}, child: ${child.id} ${child.state}`
  )
  invariant(
    block.state === BlockState.Running,
    "Only Running blocks care about child state change."
  )

  const blockType = blockTypeMap[block.type]
  if (!blockType) {
    console.log(`Block type ${block.type} doesn't have onChildStateChange()`)
    return
  }
  await blockType.onChildStateChange(block, child)
}
