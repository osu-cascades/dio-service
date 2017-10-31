# D.io Service

D.io is an aquaponics management system built for Volcano Veggies. This repo houses the server-side application and exposes a simple API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need both Node.js and NPM before you start, to install them run

```
$ brew install node
```
To make sure they're both installed properly run the following commands and verify the output
```npm
$ node -v
v6.9.2
$ npm -v
3.10.9
```

### Installing

First start by cloning the repo; create a new directory and navigate to it and run
```npm
$ git clone https://github.com/osu-cascades/dio-service.git
```
Once cloned, the dependencies can be installed by running
```npm
$ npm install
```
You will also need a .enc file to hold your config strings, to get a one run
```npm
$ node setup.js
```
This will create a .env file for you to enter your config strings, you can now remove the .sample-env file from your repo.

To verify that the application has been properly installed, run
```npm
$ npm start
```
If everything installed correctly the app should be running at `localhost:3000`

### Sequelize

This application uses sequelize ORM, to connect to your database you will need to set some .env variables for sequelize to find. Your .env file should look something like this
```npm
DEV_DB_CONN=mysql://user:password@host:port/db_name
TEST_DB_CONN=mysql://user:password@host:port/db_name
PROD_DB_CONN=mysql://user:password@host:port/db_name
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