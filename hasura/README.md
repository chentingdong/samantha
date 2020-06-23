# Bell engine backend

## overview

- PostgreSQL
- GraphQL
- Event triggers
- Bell engine in async event handlers

## hasura

- `npm install --global hasura-cli`
- `docker-compose up -d`
- `hasura migrate apply`
- `hasura metadata apply`
- `hasura console`
- hasura console will watch schema changes happened in the console and save to migrations automatically.

## hasura event handling express server

local development using nodemon:

- `yarn dev`

alternatively, using docker:

- `docker build -t samantha-server:latest .`
