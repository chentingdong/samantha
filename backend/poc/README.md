# local development

## Setup
* `mkdir -p .dynamodb/data`
* `mkdir -p certs`
* generate **key.pem** and **cert.pem**, place them in **certs/**

## Running local server 
For to run the api server and dynamodb locally, run `serverless offline start`, which will fire an init and a end lifecycle hook which is needed for `serverless-offline` and `serverless-dynamodb-local` to switch on/off resources.
* local HTTP API endpoint will be available on https://localhost:3000.
* local Websocket API endpoint will be available on http://localhost:3001.
* local DynamoDB Shell will be available on http://localhost:8000/shell.


## VSCode debug
1. `cd ~/git/samamtha/backend/poc`
2. `code .` (open the backend poc project in VSCode)
3. start debugging with **Backend** configuration
4. set breakpoints and start debugging


## calling APIs using curl command
For example: `curl -k https://localhost:3000/case-definitions`
