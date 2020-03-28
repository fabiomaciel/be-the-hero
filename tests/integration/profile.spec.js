const request = require('supertest');
const app = require('../../src/app');

const { connection } = require('../../src/database/connection');

const { clearDatabase } = require('./utils/dbUtils')
const ongUtils = require('./utils/ongUtils');
const incidentUtils = require('./utils/incidentUtils');


describe('#PROFILE', function () {

  beforeAll(async (done) => {
    await connection.migrate.latest();
    done();
  });

  beforeEach(async (done) => {
    await clearDatabase();
    done()
  });

  it('should be able get a list of incidents by its "login"', async (done) => {
    const ongId = await ongUtils.createValidOng('id');
    const LENGHT = 5;
    await incidentUtils.createValidIncidentList(LENGHT, ongId);
    const { status, body } = await request(app)
      .get('/profile')
      .set('authorization', ongId)
      .send();

    expect(status).toEqual(200);
    expect(body).toHaveLength(LENGHT);

    done();
  });

  it('should not be able get a list of incidentsif no Authorization was given', async (done) => {
    const { status, body } = await request(app)
      .get('/profile')
      .send();

    expect(status).toEqual(400);

    done();
  });


}, Number.MAX_SAFE_INTEGER);