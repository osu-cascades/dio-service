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
```
$ git clone https://github.com/osu-cascades/dio-service.git
```

Once cloned, the dependencies can be installed by running
```
$ npm install
```

To verify that the application has been properly installed, run
```npm
$ npm start
```
If everything installed correctly the app should be running at `localhost:3000`

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