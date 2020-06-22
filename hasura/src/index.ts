import express from "express"
import { getUsers } from "./graphql/queries/getUsers"
import { getUser } from "./graphql/queries/getUser"

const app = express()
const port = process.env.PORT || "8000"

app.get("/users", async (req, res) => res.json(await getUsers()))

app.get("/users/:id", async (req, res) =>
  res.json(await getUser(req.params.id))
)

app.post("/users", async (req, res) => res.json(req.body))

app.patch("/users/:id", async (req, res) => res.json(req.body))

app.use(express.json())

app.listen(port, (err) => {
  if (err) return console.error(err)
  return console.log(`Server is listening on ${port}`)
})
