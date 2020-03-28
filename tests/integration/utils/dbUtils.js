
const { connection } = require('../../../src/config/database')

async function clearDatabase() {
  await connection('incidents').truncate();
  await connection('ongs').truncate();
}

module.exports = {
  clearDatabase
}