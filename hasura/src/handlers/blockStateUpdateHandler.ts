import { Request, Response } from "express"
import { getBlockByPk } from "../graphql/queries/getBlockByPk"
import { run } from "../BTEngine"
export const blockStateUpdateHandler = async (req: Request, res: Response) => {
  let statusCode, body
  try {
    let {
      table: { name },
      event: { op, data },
    } = req.body
    statusCode = 200
    body = "Event ignored."
    if (name === "blocks" && op === "UPDATE") {
      const parentId = data.new.parent_id
      const oldState = data.old.state
      const newState = data.new.state
      if (parentId && oldState !== newState) {
        // before this is resolved, we will need to query the parent block for more information
        // https://github.com/hasura/graphql-engine/issues/1175
        // Allow Relationship Data to be Used in Triggers
        const parent = await getBlockByPk(parentId)
        body =
          `Block {id: ${data.new.id}, name: ${data.new.name}} updated, from state: ${oldState} to state: ${newState},` +
          ` running parent block {id: ${parentId}, name: ${parent.name}, type: ${parent.type}}`
        run(parent)
      }
    }
  } catch (e) {
    console.warn(e)
    statusCode = 400
    body = "Cannot parse hasura event"
  }
  console.log(body)
  return res.status(statusCode).send(body)
}
