const { connection } = require('../../config/database');
const generateUniqueId = require('../../utils/generateUniqueId');

class OngRepository {

  get connection() {
    return connection('ongs');
  }

  findAll() {
    return this.connection.select('*');
  }

  find(id, fields = ['*']) {
    return connection('ongs')
      .where('id', id)
      .select(...fields)
      .first();
  }

  async save({ name, email, whatsapp, city, uf }) {
    const id = generateUniqueId();

    await this.connection.insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });
    return id;
  }

}

module.exports = new OngRepository