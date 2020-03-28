
const { connection } = require('../../../src/database/connection')

async function clearDatabase() {
  await connection('incidents').truncate();
  await connection('ongs').truncate();
}

module.exports = {
  clearDatabase
}