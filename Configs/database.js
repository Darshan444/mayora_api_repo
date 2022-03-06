require('dotenv').config();
const Sequelize = require('sequelize');
const Chalk = require('chalk');

const DB_CREDENTIAL = {
    username    : process.env.DB_USERNAME,
    password    : process.env.DB_PASSWORD,
    database    : process.env.DB_DATABASE,
    host    : process.env.DB_HOST,
    port    : process.env.DB_PORT,
    logging : process.env.DB_LOGGING === 'true' ? console.log : false,
    dialect : process.env.DB_CONNECTION,
    dialectOptions: {
        decimalNumbers: true
    },
    seederStorage : "sequelize",
    seederStorageTableName : "SequelizeMetaSeeders"
}

sequelize = new Sequelize(DB_CREDENTIAL);
// sequelize_db2 = new Sequelize(DB_CREDENTIAL_DB2);

sequelize.authenticate().then(() => {
    console.log(Chalk.greenBright(`Database connection established successfully :)`))
}).catch((err) => {
    console.log("Failed to connect to Database  :( \n", err);
})

module.exports = {
    development: DB_CREDENTIAL,
    database: sequelize,
}