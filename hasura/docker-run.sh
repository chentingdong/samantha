#! /bin/bash
docker run -d --rm --name my_hasura -p 8080:8080 \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://postgres:password@host.docker.internal:5432/hasura \
       -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
       -e HASURA_GRAPHQL_ADMIN_SECRET=myadminsecretkey \
       hasura/graphql-engine:v1.2.2
