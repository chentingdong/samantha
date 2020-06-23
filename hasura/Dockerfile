FROM node:12-stretch-slim

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn -s install --frozen-lockfile && yarn -s cache clean

COPY . /app/

ARG SENTRY_RELEASE="local"
RUN echo "SENTRY_RELEASE=$SENTRY_RELEASE" >> /app/.sentryclirc

RUN yarn build

ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3000