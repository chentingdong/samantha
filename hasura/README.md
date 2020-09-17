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

## migration

- full db migration manually
  1. hasura migrate create "full dump from poc" --from-server --endpoint https://poc.dev.bellhop.io:8080 --schema m2
  2. curl -X POST -H 'Content-Type: application/json' -H 'X-Hasura-Role: admin' -H 'x-hasura-admin-secret: qcA.wmEfFzDpfzZZoepJs7gw' \
     https://poc.dev.bellhop.io:8080/v1alpha1/pg_dump \
     --data '{"opts": ["--column-inserts", "--data-only", "--schema", "m2"], "clean_output": true}' -o data.sql
  3. copy the content of data.sql to the up.sql, right after all the create table statements, before the add constraint statements.
  4. add DROP SCHEMA m2 CASCADE; to both up.sql and down.sql
