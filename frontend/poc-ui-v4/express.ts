const express = require("express")
const fs = require("fs")
const http = require("http")
const https = require("https")

const sourceDir = "dist"
const app = express()
app.use(express.static(sourceDir))

const port = process.env.PORT || 2000
// const privateKey  = fs.readFileSync('certs/key.pem', 'utf8');
// const certificate = fs.readFileSync('certs/cert.pem', 'utf8');
// const credentials = {key: privateKey, cert: certificate};
const httpServer = http.createServer(app)
httpServer.listen(port, () => {
  console.log(`Express http web server started on ${port}`)
  console.log(`Serving content from ./${sourceDir}/`)
})
