const request = require('supertest');
const app = require('../../src/app');

const { connection } = require('../../src/database/connection');

const { clearDatabase } = require('./utils/dbUtils')
const ongUtils = require('./utils/ongUtils');

describe('#SESSION', function () {

  beforeAll(async (done) => {
    await connection.migrate.latest();
    done();
  });

  beforeEach(async (done) => {
    await clearDatabase();
    done()
  });

  it('should be able verify ongId', async (done) => {
    await ongUtils.createValidOng('id');
    const { status } = await request(app)
      .post('/session')
      .send({
        id: "id",
      });

    expect(status).toEqual(200);

    done();
  });

  it('should not be able to verify a ong if no id was given', async (done) => {
    await ongUtils.createValidOng('id');
    const { status } = await request(app)
      .post('/session')
      .send({
        invalidProperty: "id",
      });

    expect(status).toEqual(400);

    done();
  });

  it('should not be able to verify a ong if no id was given', async (done) => {
    const { status } = await request(app)
      .post('/session')
      .send({
        id: "invalidId",
      });

    expect(status).toEqual(400);

    done();
  });

}, Number.MAX_SAFE_INTEGER);