FROM node:12-stretch-slim

RUN apt-get -qy update && apt-get -qy install openssl

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn -s install

COPY tsconfig.json jest.config.js babel.config.js /app/
COPY ./src /app/src
COPY ./cli /app/cli
COPY ./prisma /app/prisma 
RUN yarn -s prisma generate
RUN echo "DATABASE_URL=\"postgresql://postgres:password@postgres:5432/samantha\"" > /app/prisma/.env

ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 4000
