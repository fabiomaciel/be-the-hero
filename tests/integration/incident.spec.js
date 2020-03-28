const request = require('supertest');
const app = require('../../src/app');

const { connection, destroyDb } = require('../../src/config/database');

const { clearDatabase } = require('./utils/dbUtils')
const ongUtils = require('./utils/ongUtils');
const incidentUtils = require('./utils/incidentUtils');


describe('#INCIDENTS', function () {

  beforeAll(async done => {
    await connection.migrate.latest();
    done();
  });

  beforeEach(async (done) => {
    await clearDatabase()
    done();
  });


  it('should be able to register an incident', async (done) => {
    const ongId = await ongUtils.createValidOng();

    const response = await request(app)
      .post('/incidents')
      .set('Authorization', ongId)
      .send({
        title: 'title',
        description: 'desc',
        value: 'val',
      });

    expect(response.body).toHaveProperty('id');

    done();
  });

  it('should not be able to register an incident if no authorization header is given', async (done) => {
    await ongUtils.createValidOng();

    const response = await request(app)
      .post('/incidents')
      .send({
        title: 'title',
        description: 'desc',
        value: 'val',
      });

    expect(response.status).toEqual(400);

    done();
  });

  it('should be able to delete a incident', async (done) => {
    const ongId = await ongUtils.createValidOng();
    const incidentId = await incidentUtils.createValidIncident(ong_id = ongId);

    const response = await request(app)
      .delete(`/incidents/${incidentId}`)
      .set('Authorization', ongId)
      .send();

    expect(response.status).toEqual(204);
    done();
  });

  it('should not be able to delete a incident if no Authorization header its not given', async (done) => {
    const ongId = await ongUtils.createValidOng();
    const incidentId = await incidentUtils.createValidIncident(ong_id = ongId);

    const response = await request(app)
      .delete(`/incidents/${incidentId}`)
      .send();

    expect(response.status).toEqual(400);
    done();
  });

  it('should not be able to delete a incident if incident was not created by given ong', async (done) => {
    const ongId = await ongUtils.createValidOng();
    const incidentId = await incidentUtils.createValidIncident(ong_id = ongId);

    const response = await request(app)
      .delete(`/incidents/${incidentId}`)
      .set('Authorization', `invalid-id`)
      .send();

    expect(response.status).toEqual(401);
    done();
  });

  it('should not be able to delete a incident if given id is not a number', async (done) => {
    await incidentUtils.createValidIncident();

    const response = await request(app)
      .delete(`/incidents/NaN`)
      .set('Authorization', 'ongId')
      .send();

    expect(response.status).toEqual(400);
    done();
  });

  it('should be able to get a list of incidents', async (done) => {
    const LENGTH = 3;
    const ong_id = await ongUtils.createValidOng();
    await incidentUtils.createValidIncidentList(LENGTH, ong_id);

    const response = await request(app)
      .get(`/incidents`)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(3);

    done();
  });

  it('should be able to get a list of incidents maximum of "5" (default value)', async (done) => {
    const LENGTH = 15;
    const ong_id = await ongUtils.createValidOng();
    await incidentUtils.createValidIncidentList(LENGTH, ong_id);

    const { status, body, header } = await request(app)
      .get(`/incidents`)
      .send();

    expect(status).toEqual(200);
    expect(body).toHaveLength(5);
    expect(header).toHaveProperty('total-count');
    expect(Number(header['total-count'])).toEqual(LENGTH);

    done();
  });

  it('should be able to get a list of "n" incidents of given pageSize', async (done) => {
    const LENGTH = 15;
    const ong_id = await ongUtils.createValidOng();
    await incidentUtils.createValidIncidentList(LENGTH, ong_id);

    const { status, body, header } = await request(app)
      .get(`/incidents`)
      .query({ pageSize: 10 })
      .send();

    expect(status).toEqual(200);
    expect(body).toHaveLength(10);
    expect(header).toHaveProperty('total-count');
    expect(Number(header['total-count'])).toEqual(LENGTH);

    done();
  });

  it('should not be able to get a list if given pageSize is not a number', async (done) => {

    const { status, body, header } = await request(app)
      .get(`/incidents`)
      .query({ pageSize: 'NaN' })
      .send();

    expect(status).toEqual(400);

    done();
  });

  it('should be able to get a list of page 2', async (done) => {
    const LENGTH = 7;
    const ong_id = await ongUtils.createValidOng();
    await incidentUtils.createValidIncidentList(LENGTH, ong_id);

    const { status, body, header } = await request(app)
      .get(`/incidents`)
      .query({ page: 2, pageSize: 5 })
      .send();

    expect(status).toEqual(200);
    expect(body).toHaveLength(2);
    expect(header).toHaveProperty('total-count');
    expect(Number(header['total-count'])).toEqual(LENGTH);

    done();
  });

  it('should not be able to get a list if given page is not a number', async (done) => {

    const { status, body, header } = await request(app)
      .get(`/incidents`)
      .query({ page: 'NaN' })
      .send();

    expect(status).toEqual(400);

    done();
  });



}, Number.MAX_SAFE_INTEGER);
