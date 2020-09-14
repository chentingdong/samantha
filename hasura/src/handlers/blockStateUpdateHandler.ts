import { Request, Response } from "express"
import { getBlockByPk } from "../graphql/queries/getBlockByPk"
import invariant from "invariant"
import { onRun, onChildStateChange } from "../engine"
import { BlockState, Block } from "../types"

export const blockStateUpdateHandler = async (req: Request, res: Response) => {
  let statusCode, body
  try {
    let {
      table: { name },
      event: { op, data },
    } = req.body

    console.log("blockStateUpdateHandler", req.body)

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
