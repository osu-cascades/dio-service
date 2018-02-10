const dotenv = require('dotenv').config();
module.exports = {
    development: {
        username: process.env.DEV_USER,
        password: process.env.DEV_PASS,
        database: process.env.DEV_DB,
        host: process.env.DEV_HOST,
        dialect: 'mysql'
    },
    production: {
        username: process.env.PROD_USER,
        password: process.env.PROD_PASS,
        database: process.env.PROD_DB,
        host: process.env.PROD_HOST,
        dialect: 'mysql'
    }
};
