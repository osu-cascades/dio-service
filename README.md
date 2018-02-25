# DiO Service

DiO is an aquaponics management system built for Volcano Veggies. This repo houses the server-side application and exposes a simple API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need Node.js, NPM, and a Sequelize-compatible database server, such as MySQL.

### Running

Clone the repo, navigate to it, and install the dependencies:

```
npm install
```

For convenience, generate the necessary .env file:

```
node setup.js
```

This creates a _.env_ file for environment variables. See the **Sequelize** section below.

Run the application:

```
npm start
```

The app should be running at _http://localhost:3000_.

### Sequelize

This application uses sequelize ORM, to connect to your database you will need to set some .env variables for sequelize to find. Your .env file should look something like this
```npm
DB_CONN=mysql://user:password@host:port/db_name
```
Once your .env file is saved, and assuming you're running a MySQL server, you should be able to run the migrations to get your database up to date

```npm
$ sequelize db:migrate
```

## Running the tests

This application is tested using Mocha, Chai, and Supertest. To run the tests run
```npm
$ npm test
```

## Deployment

WIP

## Built With

* [Express](https://expressjs.com/) - Lightweight Node.js Web Framework
* [Sequelize](http://docs.sequelizejs.com/) - MySql ORM for Node.js
* [Mocha](https://mochajs.org/) - Testing Framework for Node.js

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/osu-cascades/dio-service/tags).

&copy; 2017 Justin Tappert. All rights reserved.
&copy; 2017 Makeila Lundy. All rights reserved.
