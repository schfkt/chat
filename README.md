# A simple node.js based chat app

[![Build Status](https://travis-ci.org/schfkt/chat.svg?branch=master)](https://travis-ci.org/schfkt/chat)

## Table of Content

* [Demo](#demo)
* [Installation](#installation)
* [Tests](#tests)
* [Deployment to production](#deployment-to-production)
* [Screenshots](#screenshots)

## Demo

https://kochat.herokuapp.com/

## Installation

This application requires:

* Node.js (6.x)
* Redis (localhost:6379)
* MongoDB (localhost:27017)

First, install the dependencies:

```
npm i
```

And then run the App:

```
npm start
```

Open http://localhost:1337/ in a browser to see it in action.

## Tests

Backend code is covered with tests (partially). You can run them locally:

```
npm run test
```

Or if you are too lazy to do so, you can just check [Travis CI page](https://travis-ci.org/schfkt/chat) :)

## Deployment to production

The App is completely ready for deployment on many servers. The following environment variables are required to be set:

* `NODE_ENV=production` – run the app in production environment
* `MONGO_URL` – connection URI for MongoDB
* `REDIS_HOST` – hostname for redis
* `REDIS_PORT` – port for redis
* `REDIS_PASSWORD` – password for redis

## Screenshots

Here is how it looks like:

![Sign In page](https://raw.githubusercontent.com/schfkt/chat/master/docs/sign-in.png)

![Sign Up page](https://raw.githubusercontent.com/schfkt/chat/master/docs/sign-up.png)

![Chat page](https://raw.githubusercontent.com/schfkt/chat/master/docs/chat.png)
