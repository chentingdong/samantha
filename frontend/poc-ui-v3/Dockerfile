FROM node:12-stretch-slim

RUN apt-get -qy update && apt-get -qy install openssl

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn -s install && yarn -s cache clean

COPY .babelrc babel.config.js tsconfig.json tslint.json express.ts /app/
COPY ./data /app/data
COPY ./configs /app/configs
COPY ./certs /app/certs
COPY ./.storybook /app/.storybook
COPY ./storybook-static /app/storybook-static
COPY ./src /app/src

RUN yarn build
ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 2000
