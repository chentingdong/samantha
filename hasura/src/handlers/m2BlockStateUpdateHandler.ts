import { Request, Response } from "express"
import { getBlockByPk } from "../graphql/m2/queries/getBlockByPk"
import invariant from "invariant"
import { onRun, onChildStateChange } from "../BTEngine/m2"
import { BlockState, Block } from "../types"

export const m2BlockStateUpdateHandler = async (
  req: Request,
  res: Response
) => {
  let statusCode, body
  try {
    let {
      table: { name },
      event: { op, data },
    } = req.body

    console.log("m2BlockStateUpdateHandler", req.body)
    console.log(data.old, data.new)
    invariant(
      name === "blocks" && op === "UPDATE",
      "Only handle block state change."
    )
    invariant(data.old.state !== data.new.state, "Only hanlde state change.")

    const block = await getBlockByPk(data.new.id, "network-only")

    if (data.new.state === BlockState.Running) {
      await onRun(block)
    }

    if (block.parent_id) {
      const parent = await getBlockByPk(block.parent_id, "network-only")
      if (parent?.state === "Running") {
        await onChildStateChange(parent, block)
      }
    }

    statusCode = 200
    body = { result: "Success" }
  } catch (error) {
    console.warn(error.message)
    statusCode = 400
    body = error.message
  }
  return res.status(statusCode).send(body)
}
