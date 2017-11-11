# Express jwt authentication example
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A simple jwt authentication with express

## Running the project

* Install all project dependencies with `npm install`
* Start the server with `npm start`
* Or start the server in watch mode with `npm run start:dev`

## Connecting to database

### Local database

* Download [mongodb](https://www.mongodb.com/download-center)
* Start it with `mongod`
* If it does not work, check the [instalation guide](https://docs.mongodb.com/manual/administration/install-community/)
* Start the project with `npm start`

### Remote database

* Open constants files at `/src/constants/index`
* Change mongoURL to your mongo server address
* Start the project with `npm start`

## Linting and Conventions

* This project uses eslint with custom [airbnb base config](https://www.npmjs.com/package/eslint-config-airbnb-base) as a lint tool, to start lint run `npm run lint`
* This project uses Commitizen git convention, to commit with right conventions run `npm run commit`
* This project uses a concise timeline, all code pushed to master should be rebased

## API

### Create account
POST: `/api/account/singup`

Body
```
{
    name: String,
    email: String,
    password: String,
    phone: [
        {
            number: Number,
            prefix: Number,
        },
    ],
}
```

### Get auth token
POST: `/api/account/token`

Body
```
{
    email: String,
    password: String
}
```

### Get user
GET: `/api/account/me`

Header
```
Authorization: Bearer <Token>
```
