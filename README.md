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

## [Optional] Test Github Actions locally using https://github.com/nektos/act and custom runner image

- build a github actions runner image locally:

  - `cd .github/runners`
  - `docker build -t github-actions-runner:latest .`
  - `cd ../..`

- copy .github/workflows/.secret.template to .github/workflows/.secret and fill out the secrets for local environment
  - List all the github actions workflows `act -l`
  - Dry run with specific ENVIRONMENT: `act -n -P ubuntu-latest=github-actions-runner:latest --secret-file .github/workflows/.secret -b -W .github/workflows/${ENVIRONMENT}.yml`
