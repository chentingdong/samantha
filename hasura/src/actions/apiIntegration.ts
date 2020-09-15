import { Request, Response } from "express"

import { api_integration_input } from "../types"
import apolloClient from "../graphql/apolloClient"
import { gql } from "@apollo/client"

const apiIntegrationHandler = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    return res.status(200).json({ message: req.body })
  } catch (e) {
    console.error(e.stack)
    return res.status(400).json({ message: e.message })
  }
}

export default apiIntegrationHandler
