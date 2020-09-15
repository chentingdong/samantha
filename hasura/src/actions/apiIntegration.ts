import { Request, Response } from "express"

import { cloneBell } from "./cloneBellsByPk"

const apiIntegrationHandler = async (req: Request, res: Response) => {
  try {
    const service = req.params.service
    switch (service) {
      default:
      case "google-drive-update":
        await googleDriveTriggerBell()
    }
    return res.status(200).json(req.body)
  } catch (e) {
    console.error(e.stack)
    return res.status(400).json({ message: e.message })
  }
}

const integrationAuthentication = () => {}

const googleDriveTriggerBell = async () => {
  // The bell to clone from. Each service should link to a specific bell in db.
  try {
    const bell_id = "FTzNAuJWthWGfQbWwV_k3"
    const main_bell_id = bell_id
    const is_definition = false
    const start_on_create = true
    cloneBell(bell_id, is_definition, main_bell_id, start_on_create)
  } catch (e) {
    console.error(e.stack)
  }
}

export default apiIntegrationHandler
