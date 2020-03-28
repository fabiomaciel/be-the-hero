const { connection } = require('../../../src/database/connection');

const validOng = require('../resources/valid-ong');
const validOngList = require('../resources/valid-list-ongs')

async function createOng(body) {
  await connection('ongs').insert(
    body
  );

  return body.id;
}

async function createValidOng(id = "1") {
  const ongId = await createOng({ ...validOng, id })
  return ongId;
}

async function createValidListOfOng() {
  for (let i = 0; i < validOngList.length; i++) {
    await createOng(validOngList[i]);
  }

  return validOngList.map(ong => ong.id);
}

module.exports = {
  createValidOng,
  createValidListOfOng
}
