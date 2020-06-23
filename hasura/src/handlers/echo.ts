import { Request, Response } from "express"

export const echo = (req: Request, res: Response) => {
  let statusCode, body
  try {
    let {
      table: { name },
      event: { op, data },
    } = req.body
    statusCode = 200
    if (name === "blocks" && op === "UPDATE") {
      body = `Block ${data.new.id} updated, from state: ${data.old.state} to state: ${data.new.state}`
    }
  } catch (e) {
    statusCode = 400
    body = "cannot parse hasura event"
  }
  console.log(body)
  return res.status(statusCode).send(body)
}
