const { connection } = require('../../database/connection');

class IncidentRepository {

  get connection() {
    return connection('incidents');
  }

  async count() {
    const [result] = await this.connection.count()
    return result['count(*)'];
  }

  findPage(page = 1, pageSize = 5) {
    return this.connection
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);
  }

  find(id) {
    return this.connection
      .where('id', id)
      .select('*')
      .first()
  }

  findByOngId(ongId) {
    return this.connection
      .where('ong_id', ongId)
      .select('*')
  }

  save({ title, description, value, ongId }) {
    return this.connection
      .insert({
        title,
        description,
        value,
        ong_id: ongId
      });
  }

  remove(id) {
    return this.connection.where('id', id).delete()
  }
}

module.exports = new IncidentRepository