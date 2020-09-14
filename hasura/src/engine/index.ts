import { Block, BlockTypeMap, BlockState } from "../types"
import Goal from "./Goal"
import Task from "./Task"
import BellExecutor from "./BellExecutor"
import APIExecutor from "./APIExecutor"
import Notification from "./Notification"
import { evalBlockPreConditions } from "./PreConditions"
import invariant from "invariant"
import { getBlockByPk } from "../graphql/queries/getBlockByPk"
import { updateBlockState } from "./utils"
import moment from "moment"

const blockTypeMap: BlockTypeMap = {
  Goal,
  Task,
  BellExecutor,
  APIExecutor,
  Notification,
}

const onTimer = async (blockId: string) => {
  const block = await getBlockByPk(blockId, "network-only")
  if (block.state === BlockState.Running) {
    updateBlockState(block, BlockState.Failure)
  }
}

const delay = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
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

  if (block.configs.timeout) {
    const ms = moment.duration(block.configs.timeout).as("milliseconds")
    await delay(ms)
    await onTimer(block.id)
  }
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
