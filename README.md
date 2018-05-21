# DiO Service

DiO is an aquaponics management system built for Volcano Veggies. This repo houses the server-side application and exposes a simple API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need Node.js, NPM, and a Sequelize-compatible database server, such as MySQL.

### Running

Clone the repo, navigate to it, and install the dependencies:

```npm
npm install
```

For convenience, generate the necessary .env file:

```npm
node setup.js
```

This creates a _.env_ file for environment variables. This project uses Sequelize ORM as well as Twilio for SMS alerts. Create a free Twilio account and add your accounts test credentials to the .env file in the Development Twilio section. Your Twilio credentials should look something liek this:

```npm
DEV_TWIL=AC69dff5629589916f94fa715f84584999
DEV_TOKEN=9255e29965eab71cb409f9900099999
DEV_RECIP=+15555555555
DEV_SEND=+18675309
```

There is also a section for live Twilio credentials if you are using this app in production.

### Sequelize

This application uses sequelize ORM, to connect to your database you will need to set some .env variables for sequelize to find. Your .env file should look something like this:

```npm
DEV_HOST=127.0.0.1
DEV_USER=root
DEV_PASS=password
DEV_PORT=3306
DEV_DB=dio
DEV_DIALECT=mysql
DEV_CONN=mysql://root:password@127.0.0.1:3306/dio
```

There is also a section for live database credentials if you are using this app in production. Once your .env file is saved, and assuming you're running a MySQL server, you should be able to run the migrations to get your database up to date

```npm
npm run migrate
```

## Running the tests

This application is tested using Mocha, Chai, and Supertest. To run the tests run:

```npm
npm test
```

## Deployment

We have chosen to host this aplication on Heroku, if you want to do the same, you will need to login to your Heroku account and setup all of the environment variables there that are in your .env file. Once you have your credentials stored in your heroku repo, Deploying this project is as simple as running:

```npm
npm run deploy
```

This command will push the master branch to Heroku and deploy it there as well as run the migrations.

## Built With

* [Express](https://expressjs.com/) - Lightweight Node.js Web Framework
* [Sequelize](http://docs.sequelizejs.com/) - MySql ORM for Node.js
* [Mocha](https://mochajs.org/) - Testing Framework for Node.js

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/osu-cascades/dio-service/tags).

&copy; 2017 Justin Tappert. All rights reserved.
&copy; 2017 Makeila Lundy. All rights reserved.
