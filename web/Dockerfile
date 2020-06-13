FROM node:12-stretch-slim

RUN apt-get -qy update && apt-get -qy install openssl curl

RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn -s install --frozen-lockfile --production && yarn -s cache clean
RUN /usr/local/bin/node-prune

COPY . /app/

ARG SENTRY_RELEASE="local"
RUN echo "SENTRY_RELEASE=$SENTRY_RELEASE" >> /app/.sentryclirc

RUN yarn build

ENV PATH /app/node_modules/.bin:$PATH
RUN eval $(cat tests/nightwatch/.env | sed 's/^/export /')

EXPOSE 2000
