const request = require('supertest');
const app = require('../../src/app');

const { connection } = require('../../src/database/connection');

const { clearDatabase } = require('./utils/dbUtils')
const ongUtils = require('./utils/ongUtils');

describe('#ONG', function () {

  beforeAll(async (done) => {
    await connection.migrate.latest();
    done();
  });

  beforeEach(async (done) => {
    await clearDatabase();
    done()
  });

  it('should be able to create a new ong', async (done) => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "CT",
        email: "contato@email.com",
        whatsapp: "11001100111",
        city: "COTIA",
        uf: "SP"
      });

    done();
  });

  it('should be able to get registered ongs', async (done) => {
    const ongId = await ongUtils.createValidOng();

    const response = await request(app).get('/ongs').send();
    const { body } = response;

    expect(body).toHaveLength(1)
    expect(body[0].id).toEqual(ongId);

    done();
  });

  it('should be able to get all registered ongs', async (done) => {
    const [ongId1, ongId2, ongId3] = await ongUtils.createValidListOfOng();

    const { body } = await request(app).get('/ongs').send();

    expect(body).toHaveLength(3);
    expect(body[0].id).toEqual(ongId1);
    expect(body[1].id).toEqual(ongId2);
    expect(body[2].id).toEqual(ongId3);

    done();

  });
}, Number.MAX_SAFE_INTEGER);