# local development

## Setup
* `mkdir -p .dynamodb/data`
* `mkdir -p certs`
* follow https://bellhop.slite.com/app/channels/OwMUP6Wu0s/notes/t80L0ZsaHP to generate **key.pem** and **cert.pem**, place them in **certs/**

## Start local MySQL and SQS(ElasticMQ)
`docker rm -f $(docker ps -aq)`
`docker run -d --rm --name my_mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=samantha -v mysql_data:/var/lib/mysql -p 3306:3306 mysql:5.6`
`docker run -d --rm --name my_sqs -p 9324:9324 softwaremill/elasticmq`

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
For example: `curl https://localhost:3000/case-definitions`
