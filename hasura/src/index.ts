import * as Sentry from "@sentry/node"

import apiIntegrationHandler from "./actions/apiIntegration"
import { blockStateUpdateHandler } from "./handlers/blockStateUpdateHandler"
import bodyParser from "body-parser"
import cloneBellsByPkHandler from "./actions/cloneBellsByPk"
import express from "express"
import { m1BlockStateUpdateHandler } from "./_m1/handlers/blockStateUpdateHandler"

const app = express()
const port = process.env.PORT || "3000"

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn:
      "https://440b17bea1104064a2bef3d1f95c99a9@o405323.ingest.sentry.io/5286841",
  })
}

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler())

app.use(bodyParser.json())

app.get("/", async (_req, res, _next) => {
  // optional: add further things to check (e.g. connecting to dababase)
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  }
  try {
    res.send()
  } catch (e) {
    healthcheck.message = e
    res.status(503).send()
  }
})

app.post("/block_state_update", m1BlockStateUpdateHandler)

app.post("/m2_block_state_update", blockStateUpdateHandler)

app.post("/clone_m2_bells_by_pk", cloneBellsByPkHandler)

app.post("/api-integration", apiIntegrationHandler)

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

app.listen(port, (err) => {
  if (err) return console.error(err)
  return console.log(`Server is listening on ${port}`)
})
