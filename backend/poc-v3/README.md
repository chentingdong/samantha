# Bellhop POC with GraphQL

## Overview

- Simplified backend development workflow
- Less time spent on API and DB layers
- More time on iterating the domain model and business logic

## Technical features

- GraphQL
- Typescript
- Prisma 2.0.0-beta (https://www.prisma.io/docs/understand-prisma/why-prisma)
- Nexus@0.20+, a delightful framework for building GraphQL APIs in Node

## Development workflow

- Install dependencies

  - `yarn`

- Start Docker

- Setup local Postgres in Docker:

  - `docker run -d --rm --name my_postgres -v my_dbdata:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_PASSWORD=password postgres`

- Validate that Docker started

  - `docker ps`

- Fill in the connection uri in your `prisma/.env` file

  - `DATABASE_URL="postgresql://postgres:password@localhost:5432/samantha"`

- Edit prisma schema in prisma/schema.prisma

- Run `yarn -s prisma migrate save --experimental` to create migration file

- Run `yarn -s prisma migrate up --experimental --create-db --auto-approve` to migrate (upgrade) your database

- Run `yarn -s prisma generate` to generate the Prisma Client

- (optionally) Run `yarn -s ts-node prisma/seed.ts` to seed your database.

- Run `yarn -s dev` to start dev GraphQL server and go to http://localhost:4000 to play with Queries and Mutations on GraphQL playground.

- (optionally) Run `yarn -s prisma studio --experimental` and go to http://localhost:5555 to use Prisma studio (the code and tree views are useful).

## CLI Client

- `cd cli`

- `npm i`

- `export user='Baiji He'` (or 'Jin Wawng', 'Tingdong Chen')

- `node bin/bellhop`

## Issues to Watch on External Modules

- JSON data type support is coming soon: https://github.com/prisma/prisma/issues/186

~~- one to many self relation creates a unique index, which should be non-unique: https://github.com/prisma/migrate/issues/405. Example manual fix:~~

- ~~`drop index "Block_parent";`~~
- ~~`create index "Block_parent" on "Block"("parent")`~~
