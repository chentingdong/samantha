import { Block, BlockState } from "../BTEngine/m1/interfaces"
import { Request, Response } from "express"
import { onChildStateChange, onRun } from "../BTEngine/m1"

import { getBlockByPk } from "../graphql/m1/queries/getBlockByPk"
import invariant from "invariant"

export const blockStateUpdateHandler = async (req: Request, res: Response) => {
  let statusCode, body
  try {
    let {
      table: { name },
      event: { op, data },
    } = req.body

    invariant(
      name === "blocks" && op === "UPDATE",
      "Only handle block state change."
    )
    invariant(data.old.state !== data.new.state, "Only hanlde state change.")

    const block = await getBlockByPk(data.new.id, "network-only")

    if (data.new.state === BlockState.Running) {
      await onRun(block)
    }

    if (block.parents.length > 0) {
      const parent = await getBlockByPk(
        block.parents[0].parent.id,
        "network-only"
      )
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
