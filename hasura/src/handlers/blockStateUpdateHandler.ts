import { Request, Response } from "express"
import { getBlockByPk } from "../graphql/queries/getBlockByPk"

const blockTypeMap = {}

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
      const parent_id = data.new.parent_id
      if (parent_id && data.old.state !== data.new.state) {
        // before this is resolved, we will need to query the parent block for more information
        // https://github.com/hasura/graphql-engine/issues/1175
        // Allow Relationship Data to be Used in Triggers
        const parent = await getBlockByPk(parent_id)
        body = `Block ${data.new.id} updated, from state: ${data.old.state} to state: ${data.new.state}, notifying parent {id: ${parent_id}, type: ${parent.type}}`
      }
    }
  } catch (e) {
    statusCode = 400
    body = "cannot parse hasura event"
  }
  console.log(body)
  return res.status(statusCode).send(body)
}
