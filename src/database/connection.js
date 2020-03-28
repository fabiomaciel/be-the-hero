const knex = require('knex');
const config = require('../../knexfile');

const { envOrElse } = require('../utils/optionalUtils');

const env = envOrElse('NODE_ENV', 'development');

let dbConnection = createConnection();

function createConnection() {
  
  return knex(config[env]);
}

module.exports = {
  get connection() {
    return dbConnection;
  }
};