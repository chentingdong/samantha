# Bell engine backend

## overview

- PostgreSQL
- GraphQL
- Event triggers
- Bell engine in async event handlers

## local setup

- `npm install --global hasura-cli`
- `docker-compose up -d`
- `hasura migrate apply`
- `hasura metadata apply`
- `hasura console`
- go to data tab, track all the tables in hasura database public schema.
  - make sure blockType, blockState, blockDefState are set as enum table.
  - make sure parent and children relationships exist on blocks and blockDefs tables.
- hasura console will watch schema changes happened in the console and save to migrations automatically.
