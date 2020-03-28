const { connection } = require('../../../src/config/database');

const validIncident = require('../resources/valid-incident');

async function createIncident(body) {
  await connection('incidents').insert(
    body
  );

  return body.id;
}

async function createValidIncident(id = "1", ong_id = "1") {
  const incidentId = await createIncident({ ...validIncident, id, ong_id })
  return incidentId;
}

async function createValidIncidentList(size = 7, ongId) {
  const incidentIdList = []
  for (let i = 0; i < size; i++) {
    incidentIdList.push(i)
    await createIncident({ ...validIncident, id: i, ong_id: ongId });
  }

  return incidentIdList;
}

module.exports = {
  createValidIncident,
  createValidIncidentList
}
