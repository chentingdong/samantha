const express = require('express')
const app = express()
const portNumber = process.env.PORT || 2002
const sourceDir = 'dist'

app.use(express.static(sourceDir))

app.listen(portNumber, () => {
  console.log(`Express web server started: https://localhost:${portNumber}`)
  console.log(`Serving content from /${sourceDir}/`)
})
