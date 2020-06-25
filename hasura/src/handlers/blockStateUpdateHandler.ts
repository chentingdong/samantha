import { Request, Response } from "express"
import { getBlockByPk } from "../graphql/queries/getBlockByPk"
import invariant from "invariant"
import { onRun, onChildStateChange } from "../BTEngine"
import { BlockState, Block } from "../BTEngine/interfaces"
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
      await onChildStateChange(parent, block)
    }

    statusCode = 200
    body = "Success"
  } catch (error) {
    console.warn(error)
    statusCode = 400
    body = error.message
  }
  console.log(body)
  return res.status(statusCode).send(body)
}
