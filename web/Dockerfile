FROM node:12-stretch-slim AS BUILD_IMAGE

RUN apt-get -qy update && apt-get -qy install openssl curl

RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn -s install --frozen-lockfile --production && yarn -s cache clean


COPY . /app/

RUN yarn build

RUN /usr/local/bin/node-prune

FROM node:12-stretch-slim

WORKDIR /app

COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 2000
