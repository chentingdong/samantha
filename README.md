## Project Status

![Production Deployment to Amazon ECS](https://github.com/bellhop-io/samantha/workflows/Production%20Deployment%20to%20Amazon%20ECS/badge.svg)

## Services

- React Web App
- Express Server for event handling
- Hasura GraphQL
- Postgres DB (local) or RDS Aurora Postgres (prod)

## Getting Started Guide

### Environment Installation

- Check out this project
- Install VSCode
  - Download https://code.visualstudio.com/download
  - Install useful extensions https://marketplace.visualstudio.com/
    - Auto Import
    - ESLint
    - Jest
    - Path Intellisense
    - Prettier - Code formatter
    - YAML
- Install homebrew
  - https://brew.sh/
- Install NVM
  - brew install nvm
- Install Yarn
  - brew install yarn
- Install Node
  - brew install node
  - Note: AWS Lamba supports version 12.
- Install Docker
  - brew install docker


## Docker Compose for standing up the server/hasura/postgres while developing web

- `cd $REPO_ROOT`
- `docker-compose up -d server`

## Docker Compose for standing up the full stack in local env

- `cd $REPO_ROOT`
- `docker-compose up -d`

## Terraform for deploying the full stack to AWS Fargate

- CI/CD managed by Github Actions
- DATABASE_URL will be injected into api service from .env
