import { Request, Response } from "express"

import { cloneBell } from "./cloneBellsByPk"
import { getIntegrationAuthentication } from "../graphql/queries/getIntegrationAuthentication"

const apiIntegrationHandler = async (req: Request, res: Response) => {
  try {
    const service = req.params.service
    const bell_id = req.headers.app_id
    const app_secret = req.headers.app_secret

    if (typeof bell_id !== "string" || typeof app_secret !== "string") {
      return res
        .status(400)
        .json({ message: "Missing app id or app secret key in header" })
    }
    const authenticated = await checkAuth(bell_id, app_secret)
    if (authenticated === false) {
      return res.status(400).json({ message: "Wrong app id or app secret" })
    }

    switch (service) {
      default:
      case "bell":
        await bellIntegration(bell_id)
        break
      case "task":
        break
    }

    return res.status(200).json({ message: "success" })
  } catch (e) {
    return res.status(400).json({ message: e.message })
  }
}

const checkAuth = async (bell_id: string, app_secret: string) => {
  const authentication = await getIntegrationAuthentication(bell_id, app_secret)

  const authenticated =
    authentication &&
    authentication.bell_id === bell_id &&
    authentication.app_secret === app_secret

  return authenticated
}

const bellIntegration = (bellId: string) => {
  try {
    const bell_id = bellId
    const main_bell_id = bell_id
    const is_definition = false
    const start_on_create = true
    cloneBell(bell_id, is_definition, main_bell_id, start_on_create)
  } catch (e) {
    console.error(e.stack)
  }
}

export default apiIntegrationHandler
