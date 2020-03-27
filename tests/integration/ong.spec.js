const request = require('supertest');
const app = require('../../src/app');

const connection = require('../../src/database/connection');

describe('#ONG', function () {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  })

  afterAll(async () => {
    await connection.destroy();
  })

  it('should be able to create a new ong', async function () {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "CT",
        email: "contato@email.com",
        whatsapp: "11972191685",
        city: "COTIA",
        uf: "SP"
      });

    console.log(response.body)

  });
})