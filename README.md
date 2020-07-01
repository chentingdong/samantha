## Project Status

![Deploy to Amazon ECS](https://github.com/bellhop-io/samantha/workflows/Deploy%20to%20Amazon%20ECS/badge.svg)

## Services

- React web app
- GraphQL API server
- Postgres DB (local) or RDS Aurora Postgres (prod)

## Getting Started Guide

### Environment Installation

- Check out this project
- Install VSCode
  - Download https://code.visualstudio.com/download
  - Install useful extensions https://marketplace.visualstudio.com/
    - ESLint
    - npm
    - Beautify
    - Debugger for Chrom
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

### Starting your local environment (with or without Docker)

- SEE `poc` directories for specific instructions

## Docker Compose for standing up the full stack in local env

- `cd $REPO_ROOT/server`
- `docker build -t samantha-server:latest .`
- `cd $REPO_ROOT/web`
- `docker build -t samantha-web:latest .`
- `cd $REPO_ROOT`
- `docker-compose up`

## Terraform for deploying the full stack to AWS Fargate

- CI/CD managed by Github Actions
- DATABASE_URL will be injected into api service from .env
