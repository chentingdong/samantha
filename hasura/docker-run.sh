#! /bin/bash
docker stop $(docker ps --filter publish=5432 -q)

docker run -d --rm --name my_postgres -v my_dbdata:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_DB=hasura postgres

docker run -d --rm --name my_hasura -p 8080:8080 \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://postgres:password@host.docker.internal:5432/hasura \
       -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
       -e HASURA_GRAPHQL_ADMIN_SECRET=myadminsecretkey \
       -e HASURA_GRAPHQL_JWT_SECRET=\{"type": "HS256", "key": "3bd561c37d214b4496d09049fadc542c"\} \
       hasura/graphql-engine:v1.2.2
