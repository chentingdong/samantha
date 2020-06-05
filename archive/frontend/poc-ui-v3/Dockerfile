FROM node:12-stretch-slim

RUN apt-get -qy update && apt-get -qy install openssl

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn -s install && yarn -s cache clean

COPY . /app/

RUN yarn build
ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 2003
