# Bell engine backend

## overview

- PostgreSQL
- GraphQL
- Event triggers
- Bell engine in async event handlers

## local setup

- `npm install --global hasura-cli`
- `bash ./docker-run.sh`
- `hasura migrate apply --admin-secret myadminsecretkey`
- `hasura console --admin-secret myadminsecretkey`
- go to data tab, track all the tables in hasura database public schema.
- hasura console will watch schema changes happened in the console and save to migrations automatically.
