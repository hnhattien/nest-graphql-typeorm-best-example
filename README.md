# Nestjs GraphQL TypeORM Best Example

> ### NestJS (GraphQL + Typeorm) codebase containing real world examples.

[![Coverage Status](https://coveralls.io/repos/github/nhattien015/nest-graphql-typeorm-best-example/badge.svg?branch=main)](https://coveralls.io/github/nhattien015/nest-graphql-typeorm-best-example?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/{nhattien015}/{nest-graphql-typeorm-best-example}/badge.svg)](https://snyk.io/test/github/{nhattien015}/{nest-graphql-typeorm-best-example})

## Introduction
#### Why should you use this example for Nest + GraphQL + TypeORM ?
- **Scalable**
- **Support for both GraphQL and traditional Rest API. You only need create a Controller file for Rest API implementation.**
- **Clear Codebase, etc...**
## Table of Contents

- [Usage](#usage)
- [Starting the Server](#starting-the-server)

## Usage

1. Clone repository

```
  git clone https://github.com/nhattien015/nest-graphql-typeorm-best-example.git
```

2. Cd into directory

```
  cd nest-graphql-typeorm-best-example/
```

3. Create .env

```
  >.env
```

4. Add to .env

```
DB_HOST=localhost
DB_PORT=5000
DB_PWD=root
DB_USERNAME=root
DB_DATABASE=nestjs
JWT_ACCESS_TOKEN_SECRET=access_token_secret_key
JWT_ACCESS_TOKEN_EXPIRES_IN=15m
JWT_REFRESH_TOKEN_SECRET=refresh_token_secret_key
JWT_REFRESH_TOKEN_EXPIRES_IN=7d
```

5. Install dependencies using npm

```
  npm install
```

## Starting the Server

1. Docker ( If use Docker. Run this code, Otherwise setup normally ).

```
  docker compose up dev-db -d
```

2. Sync schema to database

```
  npm run db:sync
```

3. Start in development mode (Default PORT: 3000)

```
  npm run start:dev
```
