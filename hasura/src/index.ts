import express from "express"
import bodyParser from "body-parser"
import { blockStateUpdateHandler } from "./handlers/blockStateUpdateHandler"
import * as Sentry from "@sentry/node"

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
app.post("/block_state_update", blockStateUpdateHandler)

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

app.listen(port, (err) => {
  if (err) return console.error(err)
  return console.log(`Server is listening on ${port}`)
})
